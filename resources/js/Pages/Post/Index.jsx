import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { formatDistance, subDays } from "date-fns";

export default function Index({ user, posts }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Job Posts
                </h2>
            }
        >
            <Head title="Job Posts" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8 space-y-6">
                    {
                        posts.map(post => (
                            <div key={post.id} className="relative flex items-center bg-white shadow-sm sm:rounded-lg px-2 md:px-6 md:space-x-3 py-5 dark:bg-gray-800">
                                { post.company_logo && (
                                    <div className="hidden sm:block flex-shrink-0 mb-2 md:mb-0 lg:absolute rounded-lg border border-gray-100 dark:border-gray-700 md:p-4 shadow-sm md:-left-9 dark:bg-gray-200 bg-white">
                                            <img src={`/storage/${post.company_logo}`} className="size-12 rounded-lg object-contain" />
                                    </div>
                                ) }
                                <div className="flex flex-col md:flex-row w-full">
                                    <div className="flex-1 min-w-0 px-2 md:pl-6 mb-2 md:mb-0 w-full text-gray-900 dark:text-gray-100">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{ post.company_name }</p>
                                        <p className="text-lg font-bold">{ post.title }</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{ post.employment_type }</p>
                                    </div>
                                    <div className="flex-none md:flex md:flex-col md:justify-start text-sm px-2 space-y-2">
                                        <div className="flex flex-1 items-start test-sm text-gray-500 dark:text-gray-400 gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                <path fillRule="evenodd" d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z" clipRule="evenodd" />
                                            </svg>
                                            <span>{ formatDistance(new Date(post.created_at), new Date(), {addSuffix: true}) }</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {
                                                post.tags.map((tag) => (
                                                    <span
                                                        key={`tag-${tag.id}`}
                                                        className="gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800"
                                                    >{tag.name}</span>
                                                ))
                                            }
                                        </div>
                                        { user && post.can.edit_post && (
                                            <a className="flex items-center test-sm text-gray-500 dark:text-gray-400 gap-2" href={route('posts.edit', { post: post.id })}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                </svg>
                                                <span>Edit</span>
                                            </a>
                                        ) }
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
