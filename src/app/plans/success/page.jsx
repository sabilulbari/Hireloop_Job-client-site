import { redirect } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Mail } from "lucide-react"; // npm i lucide-react (অপশনাল)
import { stripe } from "@/lib/stripe";
import { addedSubscription } from "@/lib/actions/subscribe";


export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const { 
    status,
    customer_details: 
    { email: customerEmail},
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    }

    const result = await addedSubscription(subsInfo);

    console.log(result);

    return (
      <main className="flex min-h-[80vh] items-center justify-center p-4 bg-[#0B0F19]">
        {/* মেইন ডার্ক কার্ড */}
        <div className="w-full max-w-md rounded-2xl border border-slate-800/60 bg-[#111827] p-8 text-center shadow-2xl shadow-black/40">
          {/* গ্লোয়িং সাকসেস আইকন */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20">
            <CheckCircle2 className="h-8 w-8" strokeWidth={2} />
          </div>

          {/* হেডার টেক্সট */}
          <h1 className="mb-2 text-2xl font-semibold tracking-tight text-slate-50">Thank you for your order!</h1>
          <p className="text-sm text-slate-400">We appreciate your business and are processing things right now.</p>

          <hr className="my-6 border-slate-800/80" />

          {/* অর্ডার ডিটেইলস বক্স (ডার্ক ভ্যারিয়েন্ট) */}
          <div className="rounded-xl bg-slate-900/50 border border-slate-800/40 p-4 text-left text-sm text-slate-300">
            <p className="mb-1 font-medium text-emerald-400">Confirmation Sent</p>
            <p>
              A digital receipt and order summary have been sent to <span className="font-semibold text-slate-50 underline decoration-slate-700">{customerEmail}</span>.
            </p>
          </div>

          {/* সাপোর্ট এবং ব্যাক বাটন */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
              <Mail className="h-3.5 w-3.5" />
              <span>
                Need help? Contact us at{" "}
                <a href="mailto:orders@example.com" className="font-medium text-sky-400 hover:text-sky-300 transition-colors underline underline-offset-4">
                  orders@example.com
                </a>
              </span>
            </div>

            <Link
              href="/"
              className="inline-flex w-full items-center justify-center rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-950 transition-all hover:bg-slate-200 active:scale-[0.98]"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return null;
}
