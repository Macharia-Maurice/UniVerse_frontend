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
	CalendarX,
	Globe,
	MapPin,
	UserRoundPlus,
} from "lucide-react";
import Image from "next/image";
import AvatarProfile from "./AvatarProfile";
import { AvatarFallback } from "@radix-ui/react-avatar";

export default function PostCard({
	pfpImage,
	first_name,
	last_name,
	type,
	date,
	content,
	postImage,
	isVerified,
	forProfile = false,
	event_date,
	isOnline,
	address,
	forEvents,
}) {
	return (
		<Card className="flex w-[37.5rem] min-w-[21.25rem] py-[0.5rem] px-[1.25rem] flex-col justify-center items-start gap-[0.75rem] rounded-[0.5rem] bg-white dark:bg-muted">
			<CardHeader>
				<div className="flex items-center self-stretch gap-[0.75rem]  ">
					<AvatarProfile
						pfpImage={pfpImage}
						first_name={first_name}
						last_name={last_name}
					/>
					<div className="flex flex-col justify-center items-start gap-[-0.75rem]">
						<div className="flex items-center gap-[0.75rem]">
							<p className="body-text">{first_name}</p>
							<p className="body-text">{last_name}</p>

							{isVerified && (
								<VerifiedIcon
									fill="#00B595"
									color="#ffff"
									className="dark:filter dark:invert"
									size={24}
								/>
							)}
						</div>
						<p className="text-sm muted">{type}</p>
						<p className="text-sm muted">{date}</p>
					</div>
					<Button
						variant="outline"
						className="ml-[15.75rem] gap-2">
						<UserRoundPlus />
						FOLLOW
					</Button>
				</div>
			</CardHeader>

			<CardContent>
				<div className="flex flex-col items-start gap-[0.75rem] self-stretch">
					{forEvents && (
						<div className="">
							<p className="inline-flex gap-1">
								<CalendarX />
								{event_date}
							</p>
							{isOnline ? (
								<p className="flex gap-1">
									<Globe /> ONLINE
								</p>
							) : (
								<p className="flex gap-1">
									<MapPin /> {address}
								</p>
							)}
						</div>
					)}
					<div className="self-stretch ">
						<p className="body-md">{content}</p>
					</div>
					<div className="self-stretch rounded-[0.25rem]">
						<Image
							src={postImage}
							alt="Post Image"
						/>
					</div>
					{forEvents && (
						<Button
							className="w-full"
							variant="secondary">
							Register
						</Button>
					)}
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
