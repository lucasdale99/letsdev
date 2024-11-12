"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { addSubscriber } from "@/actions/subscribers/actions";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useRef } from "react";
import { subscriberSchema } from "@/actions/subscribers/subscriber.schema";
import { motion } from "framer-motion";

export default function SubscriberForm() {
  const [state, action] = useFormState(addSubscriber, undefined);
  const ref = useRef<HTMLFormElement>(null);

  const example = {
    email: "lucas@strukt.io",
  };

  const [form, fields] = useForm({
    lastResult: state,
    defaultValue: example,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: subscriberSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="flex flex-col justify-center">
      <Card className="p-8 my-12 bg-zinc-900/50 border border-blue-500/20">
        <div className="flex flex-col gap-4 max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-zinc-100">
            Subscribe to My Newsletter
          </h2>
          <p className="text-zinc-400 text-lg">
            Get notified when I publish new articles and content. No spam,
            unsubscribe anytime.
          </p>
          <form
            id={form.id}
            ref={ref}
            onSubmit={form.onSubmit}
            className="flex flex-col sm:flex-row gap-3 mt-2"
            action={(formData) => {
              action(formData);
              ref.current?.reset();
            }}
          >
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-zinc-800/50 border-zinc-700 focus:border-yellow-600 focus:ring-yellow-600"
              required
            />
            <Button
              type="submit"
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-6"
            >
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-zinc-500 mt-2">
            By subscribing, you agree to receive emails from me. You can
            unsubscribe at any time.
          </p>
        </div>
        {state?.status === "success" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-sm text-green-500 mt-2"
          >
            Successfully subscribed!
          </motion.p>
        )}
        {state?.status === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-sm text-red-500 mt-2"
          >
            {"message" in state ? state.message : null}
          </motion.p>
        )}
      </Card>
    </div>
  );
}
