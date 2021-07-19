// 3rd Party Import
import { useLocation } from "react-router-dom";

export function useGetQueryParams() {
    return new URLSearchParams(useLocation().search);
}