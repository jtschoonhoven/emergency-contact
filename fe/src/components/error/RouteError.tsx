import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

const RouteError: React.FC = () => {
    const error = useRouteError();
    console.error(error);

    let message = '';
    let statusCode = 0;

    if (isRouteErrorResponse(error)) {
        statusCode = error.status;
        message = error.data?.message || error.statusText;
    } else if (error instanceof Response) {
        statusCode = error.status;
        message = error.statusText;
    } else if (error instanceof Error) {
        message = error.message;
    } else if (typeof error === 'string') {
        message = error;
    }
    message = message || 'Unknown Error';

    return (
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                {statusCode ? (
                    <p className="text-base font-semibold text-indigo-600">
                        {statusCode}
                    </p>
                ) : null}
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Oops!
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    {message}
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        to="/"
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Go back home
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default RouteError;
