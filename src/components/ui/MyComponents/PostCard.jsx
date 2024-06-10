"use client";
import React from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/shadcnComponents/card";
import { Button } from "../shadcnComponents/button";
import {
	ThumbsUp,
	Send,
	MessageSquareMore,
	Bookmark,
	VerifiedIcon,
} from "lucide-react";
import Image from "next/image";
import AvatarProfile from "./AvatarProfile";

export default function PostCard({
	pfpImage,
	name,
	type,
	date,
	content,
	postImage,
	isVerified,
	forProfile = false,
}) {
	return (
		<Card className="flex w-[37.5rem] min-w-[21.25rem] py-[0.5rem] px-[1.25rem] flex-col justify-center items-start gap-[0.75rem] rounded-[0.5rem] bg-white">
			{!forProfile && (
				<CardHeader>
					<div className="flex items-center self-stretch gap-[0.75rem]  ">
						<AvatarProfile pfpImage={pfpImage} />

						<div className="flex flex-col justify-center items-start gap-[-0.75rem]">
							<div className="flex items-center gap-[0.75rem]">
								<p className="body-text">{name}</p>
								{isVerified && (
									<VerifiedIcon
										fill="#00B595"
										color="#ffff"
										size={24}
									/>
								)}
							</div>
							<p className="body-sm">{type}</p>
							<p className="body-sm">{date}</p>
						</div>
					</div>
				</CardHeader>
			)}
			<CardContent>
				<div className="flex flex-col items-start gap-[0.75rem] self-stretch">
					<div className="self-stretch ">
						<p className="body-md">{content}</p>
					</div>
					<div className="self-stretch rounded-[0.25rem]">
						<Image
							src={postImage}
							alt="Post Image"
						/>
					</div>
				</div>
			</CardContent>
			<CardFooter className="flex justify-between items-center self-stretch">
				<Button
					variant="ghost"
					className="gap-1">
					<ThumbsUp />
					Like
				</Button>
				<Button
					variant="ghost"
					className="gap-1">
					<MessageSquareMore />
					Comment
				</Button>
				<Button
					variant="ghost"
					className="gap-1">
					<Send />
					Share
				</Button>
				<Button
					variant="ghost"
					className="gap-1">
					<Bookmark />
					Save
				</Button>
			</CardFooter>
		</Card>
	);
}
