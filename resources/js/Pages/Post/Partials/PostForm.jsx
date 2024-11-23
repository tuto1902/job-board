import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function PostForm({
    className = ''
}) {
    const user = usePage().props.auth.user;

    const { data, setData, post, patch, processing } =
        useForm({
            title: '',
            location: ''
        });

    const submit = (e) => {

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
                        value=""
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
                        value=""
                        onChange={(e) => setData('location', e.target.value)}
                        required
                        isFocused
                    />
                </div>
                <div>
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </div>
            </form>
        </section>
    );
}
