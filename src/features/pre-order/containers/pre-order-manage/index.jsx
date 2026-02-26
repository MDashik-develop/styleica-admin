import PreOrderForm from "../../components/pre-order-manage/pre-order-form";
import PreOrderTopSec from "../../components/pre-order-manage/pre-order-top-sec";


const PreOrderManage = () => {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
                <PreOrderTopSec />
            </div>
            <div className="lg:col-span-2">
                <PreOrderForm />
            </div>
        </div>
    );
};

export default PreOrderManage;