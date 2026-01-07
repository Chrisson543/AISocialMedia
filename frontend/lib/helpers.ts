import { UserT } from "@/app/types";
import { format } from "date-fns";
import { StaticImageData } from "next/image";
import BlankPfp from '@/app/assets/blank_pfp.png';

export function formatDate(date: string | number | Date) {
  const ONE_SECOND = 1000;
  const ONE_MINUTE = 60 * ONE_SECOND;
  const ONE_HOUR   = 60 * ONE_MINUTE;
  const ONE_DAY    = 24 * ONE_HOUR;

  const currentDate = Date.now();
  const postDate = new Date(date).getTime();
  const timeGap = currentDate - postDate;

  if (timeGap >= ONE_DAY) {
    return format(postDate, "MMM dd");
  } else if (timeGap >= ONE_HOUR) {
    return Math.floor(timeGap / ONE_HOUR) + "h";
  } else if (timeGap >= ONE_MINUTE) {
    return Math.floor(timeGap / ONE_MINUTE) + "m";
  } else {
    return Math.floor(timeGap / ONE_SECOND) + "s";
  }
}

export function getSafeSrc(
  raw: string | null | undefined
): string | StaticImageData {
    if (!raw) return BlankPfp;

    if (typeof raw !== "string") return BlankPfp;

    // 1) Local /public asset path
    if (raw.startsWith("/")) return raw;

    // 2) Remote URL: must be a valid http/https URL with a host
    try {
        const url = new URL(raw);
        if (
        (url.protocol === "http:" || url.protocol === "https:") &&
        url.hostname
        ) {
        return raw;
        }
    } catch {
        // new URL() threw → invalid URL
        return BlankPfp;
    }

    return BlankPfp;
}

export async function getUserClient(){
  const res = await fetch(`/api/users/me`)

  const user: UserT = await res.json()

  return user
}