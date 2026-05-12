export const INQUIRY_STATUS = {
  NEW: "new",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
};

export const INQUIRY_COLUMNS = [
  { id: INQUIRY_STATUS.NEW, title: "New" },
  { id: INQUIRY_STATUS.IN_PROGRESS, title: "In Progress" },
  { id: INQUIRY_STATUS.RESOLVED, title: "Resolved" },
];

export const INQUIRY_STATUS_BORDER_COLORS = {
  [INQUIRY_STATUS.NEW]: "#98DC9A",
  [INQUIRY_STATUS.IN_PROGRESS]: "#FF975B",
  [INQUIRY_STATUS.RESOLVED]: "#FF754F",
};

export const INQUIRY_STATUS_TEXT_COLORS = {
  [INQUIRY_STATUS.NEW]: "#1B5E20",
  [INQUIRY_STATUS.IN_PROGRESS]: "#BF360C",
  [INQUIRY_STATUS.RESOLVED]: "#B71C1C",
};

export const INQUIRY_COLUMN_BORDER_CLASSES = {
  [INQUIRY_STATUS.NEW]: "border-green-600",
  [INQUIRY_STATUS.IN_PROGRESS]: "border-orange-400",
  [INQUIRY_STATUS.RESOLVED]: "border-red-600",
};
