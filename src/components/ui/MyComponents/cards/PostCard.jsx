import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/shadcnComponents/card";
import Image from "next/legacy/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import MyCardHeader from "./MyCardHeader";
import MyCardFooter from "./MyCardFooter";

const PostCard = React.forwardRef(
	(
		{
			postId,
			title,
			content,
			postImage,
			isPostDetails = false,
			isLiked,
			isOwner,
			isSaved,
			likeCount,
			smallImage,
			bookmarkCount,
			profileId,
			pfpImage,
			forProfile = false,
			first_name,
			last_name,
			isVerified,
			isFollowingCreator,
			type,
			date,
		},
		ref,
	) => {
		const highlightHashtags = (text) => {
			return text.replace(/(#\w+)/g, '<span class="hashtag">$1</span>');
		};

		const highlightLinks = (text) => {
			return text.replace(
				/(\bhttps?:\/\/[^\s]+)/g,
				'<span class="link">$1</span>',
			);
		};

		const sanitizedContent = DOMPurify.sanitize(content);
		const highlightedContent = highlightLinks(
			highlightHashtags(sanitizedContent),
		);
		const containsHtml = /<\/?[a-z][\s\S]*>/i.test(content);

		const [isExpanded, setIsExpanded] = useState(false);
		const max_length = 250;

		const getTruncatedContent = (text) => {
			if (typeof text !== "string") {
				text = String(text); // Ensure text is a string
			}
			if (text.length <= max_length) {
				return text;
			}
			return text.substring(0, max_length) + ".... ";
		};

		const truncatedContent = getTruncatedContent(highlightedContent);

		return (
			<Card
				ref={ref}
				className="flex xl:w-[58%] w-full xl:min-w-[33.25rem] py-[0.3rem] flex-col items-start rounded-[0.5rem] bg-white dark:bg-muted">
				<MyCardHeader
					postId={postId}
					profileId={profileId}
					pfpImage={pfpImage}
					first_name={first_name}
					last_name={last_name}
					isVerified={isVerified}
					content={content}
					type={type}
					isOwner={isOwner}
					forProfile={forProfile}
					isFollowingCreator={isFollowingCreator}
					date={date}
				/>

				{isPostDetails ? (
					<CardContent className="flex flex-col items-start gap-[0.75rem] self-stretch h-[70%]">
						{title && <p className="sub-heading-3 p-1">{title}</p>}
						{postImage ? (
							<div className="rounded-[0.25rem] min-h-[30rem] w-full relative">
								<Image
									src={postImage}
									alt="Post Image"
									layout="fill"
									objectFit="cover"
								/>
							</div>
						) : null}
						<div
							dangerouslySetInnerHTML={{
								__html: highlightedContent,
							}}
							className="whitespace-pre-wrap"
						/>
					</CardContent>
				) : (
					<CardContent className="flex flex-col items-start gap-[0.75rem] self-stretch h-[70%]">
						<div className="self-stretch h-[30%]">
							{containsHtml ? (
								<Link href={`/post/${postId}`}>
									{title && (
										<p className="sub-heading-3 p-1">
											{title}
										</p>
									)}
									{postImage ? (
										smallImage ? (
											<div className="rounded-[0.25rem] h-[22rem] w-full relative">
												<Image
													src={postImage}
													alt="Post Image"
													layout="fill"
													objectFit="cover"
												/>
											</div>
										) : (
											<div className="rounded-[0.25rem] min-h-[30rem] w-full relative">
												<Image
													src={postImage}
													alt="Post Image"
													layout="fill"
													objectFit="cover"
												/>
											</div>
										)
									) : null}
									<div
										dangerouslySetInnerHTML={{
											__html: isExpanded
												? highlightedContent
												: truncatedContent,
										}}
										className="inline whitespace-pre-wrap"
									/>
									{sanitizedContent.length > max_length && (
										<p className="text-blue-500 cursor-pointer inline">
											Read More
										</p>
									)}
								</Link>
							) : (
								<div>
									{title && (
										<p className="sub-heading-3 p-1">
											{title}
										</p>
									)}
									<div
										dangerouslySetInnerHTML={{
											__html: isExpanded
												? highlightedContent
												: truncatedContent,
										}}
										className="whitespace-pre-wrap inline"
									/>
									{sanitizedContent.length > max_length && (
										<p
											className="text-blue-500 cursor-pointer inline"
											onClick={() =>
												setIsExpanded(!isExpanded)
											}>
											{isExpanded
												? "Show Less"
												: "Read More"}
										</p>
									)}
									{postImage ? (
										smallImage ? (
											<div className="rounded-[0.25rem] h-[22rem] w-full relative">
												<Image
													src={postImage}
													alt="Post Image"
													layout="fill"
													objectFit="cover"
												/>
											</div>
										) : (
											<div className="rounded-[0.25rem] min-h-[30rem] w-full relative">
												<Image
													src={postImage}
													alt="Post Image"
													layout="fill"
													objectFit="cover"
												/>
											</div>
										)
									) : null}
								</div>
							)}
						</div>
					</CardContent>
				)}
				<MyCardFooter
					postId={postId}
					isSaved={isSaved}
					isLiked={isLiked}
					likeCount={likeCount}
					bookmarkCount={bookmarkCount}
				/>
			</Card>
		);
	},
);

PostCard.displayName = "PostCard";

export default PostCard;
