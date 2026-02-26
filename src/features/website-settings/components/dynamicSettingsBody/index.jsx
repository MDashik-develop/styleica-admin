import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RiLayoutGridLine } from "react-icons/ri";
import FormInput from "../../../../components/reusable/form-input";
import Media from "../../../../components/reusable/media";
import { SubmitButton } from "../../../../components/reusable/ui/action-btns";
import { useUpdateWebsiteSetting } from "../../services/websiteSetting";
import EditorField from "../editorField";

const DynamicSettingsBody = ({ item, GroupData, Categories }) => {
  const [settings, setSettings] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [selectedFooterMedia, setSelectedFooterMedia] = useState([]);
  const [selectedBannarMedia, setSelectedBannarMedia] = useState([]);
  const [selectedGallaryMedia, setSelectedGallaryMedia] = useState([]);
  const [errMessage, setErrMessage] = useState("");
  const updateWebsiteSettingMutation = useUpdateWebsiteSetting();

  useEffect(() => {
    if (!Array.isArray(GroupData)) return;

    const mapped = GroupData.map(s => ({
      ...s,
      fieldType: s.key.includes(".title") ? "title" : s.key.includes(".content") ? "content" : "normal",
      slug: s.key.includes("page.") ? s.key.split(".")[1] || "" : null
    }));

    setSettings(mapped);

    const BannerMediaItem = GroupData.find(i => i.key === "home.featured_banners");
    const GalleryMediaItem = GroupData.find(i => i.key === "banner.gallery1");

    setSelectedBannarMedia(BannerMediaItem?.media || []);
    setSelectedGallaryMedia(GalleryMediaItem?.media || []);
    setSelectedMedia(GroupData.find(i => i.key === "site.logo")?.media ? [GroupData.find(i => i.key === "site.logo").media] : []);
    setSelectedFooterMedia(GroupData.find(i => i.key === "site.footer.logo")?.media ? [GroupData.find(i => i.key === "site.footer.logo").media] : []);
  }, [GroupData]);

  const handleAddPage = () => {
    const slug = `page-${Date.now()}`;
    const title = { id: null, group: "page", key: "", value: "", slug, fieldType: "title" };
    const content = { id: null, group: "page", key: "", value: "", slug, fieldType: "content" };
    setSettings(prev => [...prev, title, content]);
  };

  const handleInputChange = (slug, fieldType, value) => {
    setSettings(prev => {
      // new array create
      const updatedSettings = [...prev];

      // Title  value find
      let currentTitleValue = "";

      // find old title value 
      const existingTitle = prev.find(s => s.slug === slug && s.fieldType === "title");
      if (existingTitle) {
        currentTitleValue = existingTitle.value;
      }

      // if title change,  currentTitleValue upded
      if (fieldType === "title") {
        currentTitleValue = value;
      }

      // Key - space remove 
      const keyValue = currentTitleValue.replace(/\s+/g, '');

      // per item update
      return updatedSettings.map(s => {
        if (s.slug === slug) {
          // Title pdated
          if (s.fieldType === "title" && fieldType === "title") {
            return {
              ...s,
              value,
              key: `page.${keyValue}.title`
            };
          }

          if (s.fieldType === "content" && fieldType === "content") {
            return {
              ...s,
              value,
              key: `page.${keyValue}.content`
            };
          }

          if (s.fieldType === "content" && fieldType === "title") {
            return {
              ...s,
              key: `page.${keyValue}.content`
            };
          }
        }
        return s;
      });
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrMessage("");
    const empty = settings.find(s => !s.value);
    if (empty) return setErrMessage("All fields are required!");

    const payload = {
      setting: settings.map(s => {
        let value = s.value;
        if (s.key === "contact.socials" && typeof value === "object") {
          value = JSON.stringify(value);
        }
        if (s.key === "navitems" && Array.isArray(value)) value = JSON.stringify(value);
        if (s.key === "site.logo") value = selectedMedia[0] ? String(selectedMedia[0].id) : "";
        if (s.key === "home.featured_banners") value = selectedBannarMedia.length ? JSON.stringify(selectedBannarMedia.map(m => m.id)) : "[]";
        if (s.key === "banner.gallery1") value = selectedGallaryMedia.length ? JSON.stringify(selectedGallaryMedia.map(m => m.id)) : "[]";

        return { id: s.id ?? null, group: s.group, key: s.key, value: String(value) };
      })
    };

    // console.log("payload", payload);
    // return;

    updateWebsiteSettingMutation.mutate(payload, {
      onSuccess: res => toast.success(res?.message || "Settings updated"),
      onError: err => toast.error(err?.response?.data?.message || "Failed"),
    });
  };

  if (!settings.length) return <p className="text-gray-500 text-center py-10">Finding settings...</p>;

  // console.log(GroupData);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-2">
        <RiLayoutGridLine className="text-xl text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-700 capitalize">{item?.group || "Settings"}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {settings.reduce((acc, s, i) => {

          // --- Page Layout (Two pages per row, vertical Title-Editor) ---
          if (s.fieldType === "title" && s.group === "page") {
            const contentField = settings.find(x => x.slug === s.slug && x.fieldType === "content");
            acc.push(
              <div key={`page-${s.slug}`} className="col-span-1 border border-gray-200 rounded-xl p-5 bg-gray-50/20 shadow-sm space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Page Title</label>
                  <FormInput
                    type="text"
                    value={s.value}
                    placeholder="Enter title..."
                    onChange={e => handleInputChange(s.slug, "title", e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Content Editor</label>
                  <EditorField
                    value={contentField?.value || ""}
                    onChange={e => handleInputChange(s.slug, "content", e.target.value)}
                  />
                </div>
              </div>
            );
            return acc;
          }
          if (s.fieldType === "content" && s.group === "page") return acc;

          // --- Navigation Menu (Double Label Fix) ---
          if (s.key === "navitems") {
            const selectedIds = Array.isArray(s.value) ? s.value : JSON.parse(s.value || "[]");
            acc.push(
              <div key={i} className="col-span-2 p-5 border border-gray-200 rounded-xl shadow-sm">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">Navigation Menu</h4>
                <div className="flex flex-wrap gap-3">
                  {Categories?.map(cat => (
                    <div key={cat.id} className="border border-gray-200 px-3 py-2 rounded-lg bg-white flex items-center gap-2 shadow-sm min-w-[100px]">
                      <input
                        type="checkbox"
                        id={`cat-${cat.id}`}
                        className="w-4 h-4 accent-teal-600 cursor-pointer"
                        checked={selectedIds.includes(cat.id)}
                        onChange={e => {
                          let updatedIds = e.target.checked ? [...selectedIds, cat.id] : selectedIds.filter(id => id !== cat.id);
                          setSettings(prev => prev.map(x => x.key === "navitems" ? { ...x, value: updatedIds } : x));
                        }}
                      />
                      <label htmlFor={`cat-${cat.id}`} className="text-sm font-medium text-gray-700 cursor-pointer">{cat.name}</label>
                    </div>
                  ))}
                </div>
              </div>
            );
          }



          if (s.key === "contact.socials") {
            const socials =
              typeof s.value === "string"
                ? JSON.parse(s.value || "{}")
                : s.value || {};

            acc.push(
              <div
                key={i}
                className="col-span-1 p-5 border border-gray-200 rounded-xl bg-white shadow-sm"
              >
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4 block">
                  Social Links
                </label>

                <div className="space-y-3">
                  {Object.entries(socials).map(([platform, url]) => (
                    <div key={platform} className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-gray-600 capitalize">
                        {platform}
                      </label>

                      <FormInput
                        type="text"
                        placeholder={`Enter ${platform} URL`}
                        value={url}
                        onChange={e => {
                          const updatedSocials = {
                            ...socials,
                            [platform]: e.target.value,
                          };

                          setSettings(prev =>
                            prev.map(x =>
                              x.key === "contact.socials"
                                ? { ...x, value: updatedSocials }
                                : x
                            )
                          );
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );

            return acc;
          }


          // --- Home Section Category IDs (like navitems) ---
          if (s.key === "home.category_section_category_ids") {
            // Convert DB "1,2,3" → [1,2,3]
            const selectedIds = typeof s.value === "string"
              ? s.value
                .split(",")
                .map(v => v.trim())
                .filter(v => v !== "")
                .map(Number)
              : [];

            acc.push(
              <div key={i} className="col-span-2 p-5 border border-gray-200 rounded-xl shadow-sm">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-4">
                  {s.key.replace("home.", "").replace(/_/g, " ")}
                </h4>

                <div className="flex flex-wrap gap-3">
                  {Categories?.map(cat => (
                    <label
                      key={cat.id}
                      htmlFor={`home-cat-${cat.id}`}
                      className="border border-gray-200 px-3 py-2 rounded-lg bg-white flex items-center gap-2 shadow-sm cursor-pointer min-w-[100px]"
                    >
                      <input
                        id={`home-cat-${cat.id}`}
                        type="checkbox"
                        className="w-4 h-4 accent-teal-600 cursor-pointer"
                        checked={selectedIds.includes(cat.id)}
                        onChange={e => {
                          const updated = e.target.checked
                            ? [...selectedIds, cat.id]
                            : selectedIds.filter(id => id !== cat.id);

                          // Save as plain string: 1,2,3
                          const dbString = updated.join(",");

                          setSettings(prev =>
                            prev.map(x =>
                              x.key === s.key ? { ...x, value: dbString } : x
                            )
                          );
                        }}
                      />
                      <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            );

            return acc;
          }




          // --- Media and Text Fields (Unified Design) ---
          else {
            const isMedia = s.key === "site.logo" || s.key === "site.footer.logo" || s.key === "home.featured_banners" || s.key === "banner.gallery1";
            acc.push(
              <>
                {
                  s.key !== "navitems" &&

                  <div key={i} className="col-span-1 p-5 border border-gray-200 rounded-xl bg-white shadow-sm flex flex-col justify-between">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                      {s.key.replace(`${s.group}.`, "").replace(/_/g, " ")}
                    </label>
                    {isMedia ? (
                      <Media
                        selectedMedia={s.key === "site.logo" ? selectedMedia : s.key === "site.footer.logo" ? selectedFooterMedia : s.key === "home.featured_banners" ? selectedBannarMedia : selectedGallaryMedia}
                        setSelectedMedia={s.key === "site.logo" ? setSelectedMedia : s.key === "site.footer.logo" ? setSelectedFooterMedia : s.key === "home.featured_banners" ? setSelectedBannarMedia : setSelectedGallaryMedia}
                        singleUpload={s.key === "site.logo" || s.key === "site.footer.logo"}
                      />
                    ) : (
                      <FormInput
                        type="text"
                        value={s.value}
                        onChange={e => setSettings(prev => prev.map(x => x.key === s.key ? { ...x, value: e.target.value } : x))}
                      />
                    )}
                  </div>

                }
              </>
            );
          }
          return acc;
        }, [])}

        {settings.some(s => s.group === "page") && (
          <div className="col-span-2 pt-2">
            <button
              type="button"
              onClick={handleAddPage}
              className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 font-semibold hover:bg-gray-50 hover:border-teal-200 hover:text-teal-500 transition-all"
            >
              + ADD NEW PAGE SECTION
            </button>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-100">
        <SubmitButton
          loading={updateWebsiteSettingMutation.isPending}
          btnText="Save All Settings"
        />
      </div>
    </form>
  );
};

export default DynamicSettingsBody;