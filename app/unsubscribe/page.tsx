"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { removeSubscriber } from "@/handlers/subscribers/actions";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useRef } from "react";
import { subscriberSchema } from "@/lib/handlers/subscribers/subscriber.schema";

export default function Unsubscribe() {
  const [state, action] = useFormState(removeSubscriber, undefined);
  const ref = useRef<HTMLFormElement>(null);

  const [form, fields] = useForm({
    lastResult: state,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: subscriberSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="p-8 my-12 bg-zinc-900/50 border border-zinc-800">
          <div className="flex flex-col gap-4 max-w-xl mx-auto text-center">
            {state?.status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4"
              >
                <h2 className="text-2xl font-bold text-zinc-100">
                  Successfully Unsubscribed
                </h2>
                <p className="text-zinc-400 text-lg">
                  You have been removed from our newsletter. We hope to see you
                  again soon!
                </p>
                <div className="mt-4">
                  <Button
                    onClick={() => (window.location.href = "/")}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-6"
                  >
                    Return Home
                  </Button>
                </div>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-zinc-100">
                  Unsubscribe from Newsletter
                </h2>
                <p className="text-zinc-400 text-lg">
                  Sorry to see you go! If you change your mind, you can always
                  subscribe again later.
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
                    Unsubscribe
                  </Button>
                </form>
              </>
            )}
          </div>
          {state?.status === "success" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center text-sm text-green-500 mt-2"
            >
              Successfully unsubscribed!
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
      </motion.div>
    </div>
  );
}
