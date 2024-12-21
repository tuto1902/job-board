
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostForm from '@/Pages/Post/Partials/PostForm';
import { Head } from '@inertiajs/react';

export default function Edit({ post, tags, employmentTypes }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Edit A Job Post
                </h2>
            }
        >
            <Head title="Edit A Job Post" />

            <div className="py-12">
                <div className="mx-auto max-w-5xl sm:px-6 lg:px-8 space-y-6">
                    <div className="overflow-hidden bg-white shadow-sm p-4 sm:p-8 sm:rounded-lg dark:bg-gray-800">
                        <PostForm className="max-w-xl" tags={tags} jobPost={post} employmentTypes={employmentTypes} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
