import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useServerFn } from "@tanstack/react-start";
import { submitBooking } from "@/lib/booking.functions";
import { toast } from "sonner";
import { CheckCircle2, Loader2 } from "lucide-react";

export function BookingDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const submit = useServerFn(submitBooking);
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", preferredDate: "", method: "whatsapp" as const, message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submit({ data: form });
      setDone(true);
      toast.success("Consultation booked — check your inbox.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) { setDone(false); } }}>
      <DialogContent className="glass-strong border-white/10 max-w-lg">
        {done ? (
          <div className="py-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-gold mx-auto mb-3" />
            <h3 className="font-display text-xl text-foreground">You're on the calendar.</h3>
            <p className="text-sm text-muted-foreground mt-2">A consultant will reach out within one business day. We just sent a confirmation to <span className="text-foreground">{form.email}</span>.</p>
            <Button className="mt-5" onClick={() => onOpenChange(false)}>Done</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display">Book a consultation</DialogTitle>
              <DialogDescription>Tell us a bit about your setup. A consultant will reach out within one business day.</DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="grid gap-3 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="date">Preferred date / time</Label>
                  <Input id="date" placeholder="e.g. Tue 3 June, 11:00 GST" value={form.preferredDate} onChange={(e) => setForm({ ...form, preferredDate: e.target.value })} />
                </div>
                <div>
                  <Label>Meeting method</Label>
                  <Select value={form.method} onValueChange={(v) => setForm({ ...form, method: v as typeof form.method })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="zoom">Zoom</SelectItem>
                      <SelectItem value="google_meet">Google Meet</SelectItem>
                      <SelectItem value="phone">Phone call</SelectItem>
                      <SelectItem value="in_person">In-person (Ajman)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="message">Brief about your setup (optional)</Label>
                <Textarea id="message" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Activity, target jurisdiction, residency need, timeline…" />
              </div>
              <Button type="submit" disabled={loading} className="mt-2">
                {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Booking…</> : "Confirm booking"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
