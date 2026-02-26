import React, { useEffect, useRef, useState } from "react";

const ImagePreview = ({ images = [], initialWidth }) => {
    const list = Array.isArray(images) ? images : [images];

    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);

    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);
    const last = useRef({ x: 0, y: 0 });

    const activeImage = list[index]?.urls?.original;


    useEffect(() => {
        if (open) {
            const original = document.body.style.overflow;
            document.body.style.overflow = "hidden";

            return () => {
                document.body.style.overflow = original || "";
            };
        }
    }, [open]);

    const resetTransform = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    const handleWheel = (e) => {
        e.preventDefault();
        setScale((prev) =>
            Math.min(Math.max(prev + (e.deltaY > 0 ? -0.1 : 0.1), 1), 3)
        );
    };

    const handleMouseDown = (e) => {
        setDragging(true);
        last.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
        if (!dragging) return;
        setPosition((prev) => ({
            x: prev.x + (e.clientX - last.current.x),
            y: prev.y + (e.clientY - last.current.y),
        }));
        last.current = { x: e.clientX, y: e.clientY };
    };

    const close = () => {
        setOpen(false);
        resetTransform();
    };

    const next = () => {
        setIndex((i) => (i + 1) % list.length);
        resetTransform();
    };

    const prev = () => {
        setIndex((i) => (i - 1 + list.length) % list.length);
        resetTransform();
    };

    return (
        <>
            {/* Thumbnail */}
            <div
                className="cursor-zoom-in inline-block"
                onClick={() => {
                    setIndex(0);
                    setOpen(true);
                }}
            >
                <img
                    src={list[0]?.urls?.small || list[0]?.urls?.original}
                    alt=""
                    className={`${initialWidth ? initialWidth : "max-w-20"} h-fit`}
                />
            </div>

            {/* Preview Modal */}
            {open && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
                    onClick={close}
                >
                    {/* Image */}
                    <img
                        src={activeImage}
                        alt=""
                        draggable={false}
                        onClick={(e) => e.stopPropagation()}
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={() => setDragging(false)}
                        onMouseLeave={() => setDragging(false)}
                        onDoubleClick={resetTransform}
                        className="max-w-[95vw] max-h-[95vh] select-none cursor-grab active:cursor-grabbing transition-transform duration-200 ease-out"
                        style={{
                            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        }}
                    />

                    {/* Navigation */}
                    {list.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prev();
                                }}
                                className="absolute left-6 text-white text-4xl select-none"
                            >
                                ‹
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    next();
                                }}
                                className="absolute right-6 text-white text-4xl select-none"
                            >
                                ›
                            </button>
                        </>
                    )}

                    {/* Close */}
                    <button
                        onClick={close}
                        className="absolute top-6 right-6 text-white text-2xl"
                    >
                        ✕
                    </button>
                </div>
            )}
        </>
    );
};

export default ImagePreview;