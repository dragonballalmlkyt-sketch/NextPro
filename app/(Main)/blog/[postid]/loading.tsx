import { Skeleton } from "@/components/ui/skeleton";

export default function PostDetailsSkeleton() {
    return (
        <div className="w-full max-w-3xl mx-auto py-8 px-4 text-left items-start">
            {/* زر العودة Skeleton */}
            <div className="flex items-center justify-between w-full mb-4 gap-4">
                <Skeleton className="h-10 w-28 rounded-md" />
            </div>

            {/* صورة المقال Skeleton */}
            <Skeleton className="w-full rounded-xl h-[200px] xs:h-[250px] sm:h-[420px]" />

            <div className="mt-6 flex flex-col gap-4">
                {/* العنوان Skeleton */}
                <Skeleton className="h-10 w-3/4 sm:h-12" />

                {/* تاريخ النشر Skeleton */}
                <Skeleton className="h-4 w-36" />

                {/* محتوى النص Skeleton (عدة أسطر) */}
                <div className="space-y-2 mt-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-4/5" />
                    <Skeleton className="h-5 w-2/3" />
                </div>

                {/* مكون التواجد Presence Skeleton */}
                <Skeleton className="h-6 w-32 my-2" />

                <hr className="my-6 border-t-2 border-border opacity-80" />

                {/* قسم التعليقات Skeleton */}
                <div className="space-y-4">
                    <Skeleton className="h-8 w-40" />
                    <Skeleton className="h-20 w-full rounded-lg" />
                    <div className="space-y-3 mt-4">
                        <Skeleton className="h-12 w-full rounded-md" />
                        <Skeleton className="h-12 w-full rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
}