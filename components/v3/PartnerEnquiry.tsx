"use client";

import { useState } from "react";
import CalBookingButton from "@/components/CalModal";
import Reveal from "@/components/v3/Reveal";

/**
 * The partnership enquiry.
 *
 * Same dual-path shape as /v2's booking block, but the fields are the ones a
 * campaign actually turns on: which tool, which formats, what the budget band
 * is, and when it needs to land. Asking for a budget band up front is the
 * single biggest time-saver on both sides — it ends the three-email dance
 * before it starts, and it's what every brand manager expects to be asked.
 *
 * Posts to the same n8n webhook the consulting form uses
 * (NEXT_PUBLIC_N8N_CONSULTING_FORM_WEBHOOK), tagged `source: "creator-brands"` so
 * partnership enquiries can be routed away from client work. With the env var
 * unset it shows an honest error and points at the calendar — it never fakes
 * a success.
 */

const FORMATS = [
  "Reel integration",
  "Build video",
  "Written teardown",
  "Live session",
  "Not sure yet",
];

const BUDGETS = [
  "Under €1,000",
  "€1,000 – €2,500",
  "€2,500 – €5,000",
  "€5,000+",
  "Tell me what it should be",
];

export default function PartnerEnquiry() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [budget, setBudget] = useState(BUDGETS[2]);
  const [timeline, setTimeline] = useState("");
  const [formats, setFormats] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  function toggleFormat(f: string) {
    setFormats((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) return;

    const webhookUrl = process.env.NEXT_PUBLIC_N8N_CONSULTING_FORM_WEBHOOK;
    if (!webhookUrl) {
      setFailed(true);
      return;
    }

    setSending(true);
    setFailed(false);
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          product,
          budget,
          timeline,
          formats,
          problem: message,
          source: "creator-brands",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Webhook responded with an error");
      setSent(true);
    } catch {
      setFailed(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="v3-enq" id="enquire">
      <div className="v3-w">
        <Reveal>
          <div className="v3-head v3-head--center">
            <span className="v3-label v3-label--center">Start a campaign</span>
            <h2 className="v3-h2">
              Tell me about
              <br />
              <span className="oh">the product.</span>
            </h2>
            <p className="v3-sub v3-sub--center">
              I&apos;ll come back within 48 hours with a straight answer on whether it&apos;s a
              fit, which format suits it, and a number. Including if the honest answer is that
              my audience isn&apos;t yours.
            </p>
          </div>
        </Reveal>

        <div className="v3-enq-grid">
          <Reveal>
            <div className="v3-enq-card">
              <h3>The fast route</h3>
              <p>
                Thirty minutes on a call. Show me the product, tell me what the campaign is
                meant to do, and I&apos;ll tell you on the call whether I can do it.
              </p>
              <CalBookingButton className="v3-btn-o">
                Book a call <span className="v3-arr">→</span>
              </CalBookingButton>
              <p className="v3-enq-note" style={{ marginTop: 20 }}>
                Prefer email? <a href="mailto:riz@withsoch.com">riz@withsoch.com</a>
              </p>
            </div>
          </Reveal>

          {sent ? (
            <div className="v3-enq-done">
              <h3>Got it. Talk soon.</h3>
              <p>
                That came straight to me, not to an agency inbox. I&apos;ll read it myself and
                come back within 48 hours — including if the honest answer is no.
              </p>
            </div>
          ) : (
            <Reveal>
              <form className="v3-enq-form" onSubmit={handleSubmit}>
                <div className="v3-enq-2col">
                  <div>
                    <label htmlFor="v3-name">Your name</label>
                    <input
                      id="v3-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="v3-email">Work email</label>
                    <input
                      id="v3-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="v3-enq-2col">
                  <div>
                    <label htmlFor="v3-company">Company</label>
                    <input
                      id="v3-company"
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="v3-product">Product URL</label>
                    <input
                      id="v3-product"
                      type="text"
                      placeholder="https://"
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label>Formats you&apos;re interested in</label>
                  <div className="v3-checks">
                    {FORMATS.map((f) => (
                      <label
                        key={f}
                        className={`v3-check${formats.includes(f) ? " is-on" : ""}`}
                      >
                        <input
                          type="checkbox"
                          checked={formats.includes(f)}
                          onChange={() => toggleFormat(f)}
                        />
                        {f}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="v3-enq-2col">
                  <div>
                    <label htmlFor="v3-budget">Budget band</label>
                    <select
                      id="v3-budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    >
                      {BUDGETS.map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="v3-timeline">When does it need to land?</label>
                    <input
                      id="v3-timeline"
                      type="text"
                      placeholder="e.g. before our launch on the 14th"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="v3-message">What does the product actually do?</label>
                  <textarea
                    id="v3-message"
                    rows={4}
                    required
                    placeholder="In plain English, and what you'd want someone watching to do next"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="v3-btn-o"
                  disabled={sending}
                  style={{ justifySelf: "start", opacity: sending ? 0.6 : 1 }}
                >
                  {sending ? "Sending…" : "Send the brief"} <span className="v3-arr">→</span>
                </button>

                {failed && (
                  <p className="v3-enq-err">
                    That didn&apos;t send. Book a call directly, or email riz@withsoch.com.
                  </p>
                )}

                <p className="v3-enq-note">
                  Goes straight to my inbox. I answer everything myself.
                </p>
              </form>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
