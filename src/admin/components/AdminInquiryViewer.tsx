"use client";

import React, { useState } from "react";
import { OrderInquiry } from "@/backend/models/types";
import { Phone, Clock, ShoppingBag, CheckCircle2, ChevronRight, User } from "lucide-react";

interface AdminInquiryViewerProps {
  inquiries: OrderInquiry[];
  onUpdateStatus: (id: string, status: OrderInquiry["status"]) => void;
}

export default function AdminInquiryViewer({
  inquiries,
  onUpdateStatus,
}: AdminInquiryViewerProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<OrderInquiry | null>(
    inquiries.length > 0 ? inquiries[0] : null
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left List */}
      <div className="lg:col-span-5 space-y-3">
        <h3 className="font-display font-bold text-base text-white mb-2">
          Customer Reservations ({inquiries.length})
        </h3>

        {inquiries.length === 0 ? (
          <div className="p-8 rounded-2xl bg-surface-1 border border-white/10 text-center text-slate-400 text-xs">
            No order reservations received yet.
          </div>
        ) : (
          inquiries.map((inq) => {
            const isSelected = selectedInquiry?.id === inq.id;
            return (
              <div
                key={inq.id}
                onClick={() => setSelectedInquiry(inq)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? "bg-surface-2 border-brand-purple shadow-md shadow-brand-purple/10"
                    : "bg-surface-1 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="font-bold text-sm text-white">{inq.customerName}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      inq.status === "Confirmed"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                        : inq.status === "Completed"
                        ? "bg-brand-purple/20 text-brand-purpleLight border border-brand-purple/40"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                    }`}
                  >
                    {inq.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{inq.customerPhone}</span>
                  <span className="font-bold text-brand-gold">
                    ₹{inq.totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
                  <Clock size={11} />
                  <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Right Details Panel */}
      <div className="lg:col-span-7">
        {selectedInquiry ? (
          <div className="p-6 rounded-2xl bg-surface-1 border border-white/10 space-y-6 sticky top-20 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Reservation #{selectedInquiry.id}
                </span>
                <h3 className="font-display font-bold text-xl text-white">
                  {selectedInquiry.customerName}
                </h3>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-slate-400">Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    onUpdateStatus(selectedInquiry.id, e.target.value as OrderInquiry["status"])
                  }
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white focus:outline-none focus:border-brand-purple"
                >
                  <option value="Pending" className="bg-surface-1">Pending</option>
                  <option value="Confirmed" className="bg-surface-1">Confirmed</option>
                  <option value="Completed" className="bg-surface-1">Completed</option>
                  <option value="Cancelled" className="bg-surface-1">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] text-slate-400 block mb-1">Phone Number</span>
                <a
                  href={`tel:${selectedInquiry.customerPhone}`}
                  className="text-brand-gold font-bold flex items-center gap-1 hover:underline"
                >
                  <Phone size={12} />
                  <span>{selectedInquiry.customerPhone}</span>
                </a>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[10px] text-slate-400 block mb-1">Order Total</span>
                <span className="font-display font-extrabold text-base text-white">
                  ₹{selectedInquiry.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {selectedInquiry.customerNotes && (
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
                <span className="text-[10px] text-slate-400 block mb-1">Customer Note</span>
                <p className="text-slate-300 italic">{selectedInquiry.customerNotes}</p>
              </div>
            )}

            {/* Reserved Items List */}
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Reserved Showroom Items
              </h4>
              <div className="divide-y divide-white/5 border border-white/10 rounded-xl overflow-hidden">
                {selectedInquiry.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs bg-white/[0.01]">
                    <div>
                      <div className="font-semibold text-white">{item.productName}</div>
                      <div className="text-[10px] text-slate-400">Qty: {item.quantity} × ₹{item.price}</div>
                    </div>
                    <div className="font-bold text-brand-gold">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <a
                href={`tel:${selectedInquiry.customerPhone}`}
                className="flex-1 btn btn-primary py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Phone size={14} />
                <span>Call Customer Directly</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-surface-1 border border-white/10 text-center text-slate-400 text-xs">
            Select a reservation from the left list to view details.
          </div>
        )}
      </div>
    </div>
  );
}
