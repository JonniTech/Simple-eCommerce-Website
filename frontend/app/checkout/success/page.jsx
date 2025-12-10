"use client";

import { Suspense } from "react";
import SuccessContent from "./SuccessContent";

export default function Page() {
    return (
        <Suspense fallback={<div className="text-center mt-32">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
