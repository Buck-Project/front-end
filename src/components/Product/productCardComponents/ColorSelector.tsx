import React, { useState } from "react";
import type { ColorSelectorProps } from "@/types/productCardTypes";
import { Check } from "lucide-react";

const isDarkColor = (hex: string) => {
    const normalized = hex.replace("#", "");
    const value = normalized.length === 3
        ? normalized.split("").map((c) => c + c).join("")
        : normalized;
    if (value.length !== 6) {
        return false;
    }
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance < 140;
};

const getColorHex = (color: string | { hex: string }) =>
    typeof color === "string" ? color : color.hex;

const ColorSelector: React.FC<ColorSelectorProps> = ({ product }) => {
    const [selectedHex, setSelectedHex] = useState<string | undefined>(() =>
        product.colors[0] ? getColorHex(product.colors[0]) : undefined
    );

    return (
        <div className="flex gap-2 flex-wrap">
            {product.colors.map(color => {
                const hex = getColorHex(color);
                return (
                <button
                    key={hex}
                    onClick={() => setSelectedHex(hex)}
                    type="button"
                    className={`relative w-4 aspect-square rounded-full border border-border ${selectedHex === hex
                        ? "ring-2 ring-primary/40 ring-offset-1"
                        : ""
                        }`}
                    style={{ backgroundColor: hex }}
                    aria-pressed={selectedHex === hex}
                >
                    {selectedHex === hex && (
                        <span
                            className={`absolute inset-0 flex items-center justify-center ${isDarkColor(hex)
                                ? "text-white"
                                : "text-gray-800"
                                }`}
                        >
                            <Check className="w-3 h-3" />
                        </span>
                    )}
                </button>
                );
            })}
        </div>
    );
};


export default ColorSelector;
