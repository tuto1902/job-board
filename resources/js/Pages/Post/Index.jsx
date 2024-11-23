import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ jobs }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Jobs
                </h2>
            }
        >
            <Head title="Jobs" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    {
                        jobs.map(job => (
                            <div key={job.id} className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                                <div className="p-6 text-gray-900 dark:text-gray-100">
                                    { job.title }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
