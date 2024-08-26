import React from "react";

export default function useConverterDate() {
  function formatConversationDate(time: Date): string {
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 24 * 60 * 60 * 1000) {
      // less than 24 hours
      return formatTime(date);
    } else if (diff < 48 * 60 * 60 * 1000) {
      // between 24 and 48 hours
      return "1 day ago";
    } else if (diff < 7 * 24 * 60 * 60 * 1000) {
      // between 2 and 7 days
      return `${Math.floor(diff / (24 * 60 * 60 * 1000))} days ago`;
    } else if (diff < 30 * 24 * 60 * 60 * 1000) {
      // between 1 and 4 weeks
      return `${Math.floor(diff / (7 * 24 * 60 * 60 * 1000))} weeks ago`;
    } else if (diff < 365 * 24 * 60 * 60 * 1000) {
      // between 1 and 12 months
      return `${Math.floor(diff / (30 * 24 * 60 * 60 * 1000))} months ago`;
    } else {
      // more than a year
      return `${Math.floor(diff / (365 * 24 * 60 * 60 * 1000))} years ago`;
    }
  }
  function formatTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }
  return { formatConversationDate };
}
