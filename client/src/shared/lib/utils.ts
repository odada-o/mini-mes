// src/lib/utils.ts에 이미 있을 것으로 예상되는 cn 유틸리티 함수
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}