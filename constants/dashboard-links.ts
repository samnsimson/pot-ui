import { FileIcon, FolderIcon, ImagesIcon, VideoIcon } from "lucide-react";

export const dashboardLinks = [
	{
		name: "Content",
		key: "content",
		icon: FolderIcon,
		link: "/dashboard/content",
	},
	{
		name: "Images",
		key: "images",
		icon: ImagesIcon,
		link: "/dashboard/images",
	},
	{
		name: "Videos",
		key: "videos",
		icon: VideoIcon,
		link: "/dashboard/videos",
	},
	{
		name: "Documents",
		key: "documents",
		icon: FileIcon,
		link: "/dashboard/documents",
	},
];
