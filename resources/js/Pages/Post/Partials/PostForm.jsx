import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';

export default function PostForm({
    className = '',
    jobPost = null,
    employmentTypes,
    tags
}) {
    const user = usePage().props.auth.user;

    const [search, setSearch] = useState('');

    const [showResults, setShowResults] = useState(false);

    const [selectedTags, setSelectedTags] = useState(jobPost ? jobPost.tags : []);

    const tagsRef = useRef(null);

    let searchResults = [];
    if (search) {
        searchResults = tags.filter((tag) => {
            let selectedTagIds = selectedTags.map((selectedTag) => selectedTag.id)

            return tag.name.includes(search) && !selectedTagIds.includes(tag.id);
        });
    }

    const handleClickOutside = (event) => {
        if (tagsRef.current && tagsRef.current.contains(event.target)) {
            setSearch('');
            setShowResults(false);
        }
    }

    useEffect(() => {
        setShowResults(searchResults.length > 0)
    }, [searchResults]);

    useEffect(() => {
        setData('tags', selectedTags.map((tag) => tag.id))
    }, [selectedTags]);

    useEffect(() => {
        document.addEventListener('onmousedown', handleClickOutside);
        return () => {
            document.removeEventListener('onmousedown', handleClickOutside);
        }
    }, [])


    const { data, setData, post, delete: destroy, processing } =
        useForm({
            title: jobPost ? jobPost.title : '',
            location: jobPost ? jobPost.location : '',
            employment_type: jobPost ? jobPost.employment_type : '',
            url: jobPost ? jobPost.url : '',
            salary: jobPost ? jobPost.salary : '',
            company_name: jobPost ? jobPost.company_name : '',
            company_logo: '',
            tags: jobPost ? jobPost.tags : []
        });



    const selectTag = (tag) => {
        setSelectedTags((currentSelectedTags) => {
            let newSelectedTags = [...currentSelectedTags, tag];
            return newSelectedTags;
        });
        setSearch('');
    }

    const removeTag = (tag) => {
        setSelectedTags(selectedTags.filter((currentTag) => tag.id != currentTag.id))
    }

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
                <div ref={tagsRef}>
                    {selectedTags.length > 0 && (
                        <div className="mb-3 flex flex-wrap rounded-lg bg-gray-200 dark:bg-gray-600 px-2 pb-11 pt-2 gap-2">
                            {selectedTags.map((tag) => (
                                <span
                                    key={tag.id}
                                    className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800"
                                >
                                    {tag.name}
                                    <button
                                        onClick={() => removeTag(tag)}
                                        type="button"
                                        className="shrink-0 size-4 inline-flex items-center justify-center rounded-full hover:bg-gray-600 focus:outline-none focus:bg-gray-200 focus:text-gray-500 dark:hover:bg-gray-400"
                                    >
                                        <span className="sr-only">Remove badge</span>
                                        <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
                                            <path d="m6 6 12 12"></path>
                                            <path d="M18 6 6 18"></path>
                                        </svg>
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                    <InputLabel htmlFor="tags" value="Tags" />

                    <div className="mt-1 flex flex-col items-center text-sm w-full">
                        <div className="relative w-full">
                            <div className="w-full sm:mb-2">
                                <TextInput
                                    id="tags"
                                    className="mt-1 block w-full"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    isFocused
                                />
                            </div>
                            { showResults && (
                                <div className="absolute z-10 w-full">
                                    <Card
                                        className="max-h-40 w-full overflow-y-auto overflow-x-hidden
                                            [&::-webkit-scrollbar]:w-2
                                            [&::-webkit-scrollbar-track]:rounded-full
                                            [&::-webkit-scrollbar-track]:bg-gray-100
                                            [&::-webkit-scrollbar-thumb]:rounded-full
                                            [&::-webkit-scrollbar-thumb]:bg-gray-300
                                            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                                            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                                        >
                                        {searchResults.map((tag) => (
                                            <Button
                                                key={`resutls-tag-${tag.id}`}
                                                type="button"
                                                variant="ghost"
                                                onClick={() => selectTag(tag)}
                                                className="flex items-center justify-between w-full"
                                            >
                                                <span>{tag.name}</span>
                                            </Button>
                                        ))}
                                    </Card>
                                </div>
                            )}
                        </div>
                    </div>
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
