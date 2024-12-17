import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function PostForm({
    className = '',
    jobPost = null,
    employmentTypes
}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, delete: destroy, processing } =
        useForm({
            title: jobPost ? jobPost.title : '',
            location: jobPost ? jobPost.location : '',
            employment_type: jobPost ? jobPost.employment_type : '',
            url: jobPost ? jobPost.url : '',
            salary: jobPost ? jobPost.salary : '',
            company_name: jobPost ? jobPost.company_name : '',
            company_logo: ''
        });

    const submit = (e) => {
        e.preventDefault();
        if (jobPost) {
            post(`/posts/${jobPost.id}`, {
                method: 'put',
            })
        } else {
            post('/posts');
        }
    }

    const deletePost = (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to delete this post?')) {
            destroy(`/posts/${jobPost.id}`);
        }
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Job Post Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Describe the job post
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="title" value="Job Tile" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        required
                        isFocused
                    />
                </div>
                <div>
                    <InputLabel htmlFor="location" value="Location" />

                    <TextInput
                        id="location"
                        className="mt-1 block w-full"
                        value={data.location}
                        onChange={(e) => setData('location', e.target.value)}
                        required
                        isFocused
                    />
                </div>
                <div>
                    <InputLabel htmlFor="employment_type" value="Employment Type" />
                    <SelectInput
                        className="mt-1 block w-full"
                        value={data.employment_type}
                        onChange={(e) => setData('employment_type', e.target.value)}
                    >
                        { employmentTypes.map(employmentType => (
                            <option key={employmentType} value={employmentType}>{employmentType}</option>
                        ))}
                    </SelectInput>
                </div>
                <div>
                    <InputLabel htmlFor="url" value="URL to Description/Application" />

                    <TextInput
                        id="url"
                        className="mt-1 block w-full"
                        value={data.url}
                        hint="https://yourcompany.com/careers"
                        onChange={(e) => setData('url', e.target.value)}
                        required
                        isFocused
                    />
                </div>
                <div>
                    <InputLabel htmlFor="company_name" value="Company Name" />

                    <TextInput
                        id="company_name"
                        className="mt-1 block w-full"
                        value={data.company_name}
                        onChange={(e) => setData('company_name', e.target.value)}
                        required
                        isFocused
                    />
                </div>
                <div>
                    <InputLabel htmlFor="salary" value="Salary (Optional)" />

                    <TextInput
                        id="salary"
                        className="mt-1 block w-full"
                        value={data.salary}
                        hint="Examples: $120,000 – $145,000 USD, €80,000 — €102,000"
                        onChange={(e) => setData('salary', e.target.value)}
                        required
                        isFocused
                    />
                </div>
                <div>
                    <InputLabel htmlFor="company_logo" value="Company Logo" />

                    <TextInput
                        id="company_logo"
                        type="file"
                        className="mt-1 block w-full"
                        hint="130x130 is best, but any works"
                        onChange={(e) => setData('company_logo', e.target.files[0])}
                        isFocused
                    />
                </div>
                <div className="flex items-center gap-6">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    {jobPost && (
                        <DangerButton type="button" onClick={deletePost} disabled={processing}>Delete</DangerButton>
                    )}
                </div>
            </form>
        </section>
    );
}
