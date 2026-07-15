"use client";

import React from "react";
import { Table, Button } from "@heroui/react";
import { CircleArrowDownFill } from "@gravity-ui/icons";
import { updateCompany } from "@/lib/actions/companies";
import toast from "react-hot-toast";

const CompanyTable = ({ companies }) => {
  const handleApprove = async (id) => {
    const result = await updateCompany(id, { status: "Approved" });
    if (result.modifiedCount > 0) {
      toast.success("Company approved successfully!");
    }
  };

  const handleReject = async (id) => {
    const result = await updateCompany(id, { status: "Rejected" });
    if (result.modifiedCount > 0) {
      toast.success("Company rejected successfully!");
    }
  };

  // Helper to format date cleanly like "Oct 12, 2023"
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  // Status mapping for visual styling
  const getStatusDetails = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return { color: "text-emerald-500", dotBg: "bg-emerald-500", label: "Approved" };
      case "rejected":
        return { color: "text-rose-500", dotBg: "bg-rose-500", label: "Rejected" };
      case "pending":
      default:
        return { color: "text-amber-500", dotBg: "bg-amber-500", label: "Pending" };
    }
  };

  // Helper to generate initials for the placeholder icon
  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()
      : "CO";
  };

  return (
    <div className="w-full bg-[#121214] text-neutral-200 p-4 sm:p-6 rounded-lg">
      {/* ================= DESKTOP VIEW (Table) ================= */}
      <div className="hidden lg:block">
        <Table className="bg-transparent border-none">
          <Table.ScrollContainer>
            <Table.Content aria-label="Company approval management table">
              <Table.Header>
                <Table.Column isRowHeader className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">
                  Company Name
                </Table.Column>
                <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">Recruiter Email</Table.Column>
                <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">Industry</Table.Column>
                <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">Jobs Count</Table.Column>
                <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">Status</Table.Column>
                <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800">Date Submitted</Table.Column>
                <Table.Column className="text-neutral-400 font-medium pb-4 border-b border-neutral-800 text-right">Actions</Table.Column>
              </Table.Header>
              <Table.Body>
                {companies.map((company) => {
                  const companyId = company._id?.$oid || company._id;
                  const statusInfo = getStatusDetails(company.status);

                  return (
                    <Table.Row key={companyId} className="border-b border-neutral-800/50 hover:bg-neutral-900/30 transition-colors">
                      {/* Company Avatar & Name */}
                      <Table.Cell className="py-4 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 flex items-center justify-center bg-neutral-800 text-neutral-300 rounded font-semibold text-sm tracking-wider shrink-0">
                            {getInitials(company.name)}
                          </div>
                          <span className="font-medium text-neutral-200">{company.name}</span>
                        </div>
                      </Table.Cell>

                      {/* Recruiter Email */}
                      <Table.Cell className="py-4 align-middle text-neutral-400">
                        {company.recruiterEmail || `recruiter@${company.name.toLowerCase().replace(/\s+/g, "")}.com`}
                      </Table.Cell>

                      {/* Industry Pill */}
                      <Table.Cell className="py-4 align-middle">
                        <span className="px-3 py-1 bg-neutral-800/60 text-neutral-400 rounded-full text-xs capitalize">{company.industry}</span>
                      </Table.Cell>

                      {/* Jobs Count */}
                      <Table.Cell className="py-4 align-middle">
                        <span className="px-3 py-1 bg-neutral-800/60 text-neutral-400 rounded-full text-xs capitalize">{company.jobCount}</span>
                      </Table.Cell>

                      {/* Status Dot */}
                      <Table.Cell className="py-4 align-middle">
                        <div className="flex items-center gap-2">
                          <CircleArrowDownFill className={`w-2 h-2 ${statusInfo.color}`} />
                          <span className={`text-sm font-medium ${statusInfo.color}`}>{statusInfo.label}</span>
                        </div>
                      </Table.Cell>

                      {/* Date Submitted */}
                      <Table.Cell className="py-4 align-middle text-neutral-400">{formatDate(company.createdAt?.$date || company.createdAt)}</Table.Cell>

                      {/* Actions */}
                      <Table.Cell className="py-4 align-middle text-right">
                        <div className="flex justify-end gap-2">
                          {company.status?.toLowerCase() !== "approved" && (
                            <Button
                              size="sm"
                              variant="light"
                              onClick={() => handleApprove(companyId)}
                              className="bg-emerald-950/30 hover:bg-emerald-900/50 text-emerald-500 border border-emerald-900/60 rounded px-3 py-1 text-xs font-medium transition-colors"
                            >
                              Approve
                            </Button>
                          )}
                          {company.status?.toLowerCase() !== "rejected" && (
                            <Button
                              size="sm"
                              variant="light"
                              onClick={() => handleReject(companyId)}
                              className="bg-rose-950/20 hover:bg-rose-900/40 text-rose-500 border border-rose-900/40 rounded px-3 py-1 text-xs font-medium transition-colors"
                            >
                              Reject
                            </Button>
                          )}
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>

      {/* ================= MOBILE & TABLET VIEW (Responsive Cards) ================= */}
      <div className="block lg:hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companies.map((company) => {
            const companyId = company._id?.$oid || company._id;
            const statusInfo = getStatusDetails(company.status);

            return (
              <div
                key={companyId}
                className="bg-[#18181b]/60 border border-neutral-800 rounded-lg p-5 flex flex-col justify-between gap-4 hover:border-neutral-700 transition-colors"
              >
                {/* Top Section: Avatar, Name, Status */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center bg-neutral-800 text-neutral-300 rounded font-semibold text-sm tracking-wider shrink-0">
                      {getInitials(company.name)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-neutral-100 text-base">{company.name}</span>
                      <span className="text-xs text-neutral-400 break-all">{company.recruiterEmail || `recruiter@${company.name.toLowerCase().replace(/\s+/g, "")}.com`}</span>
                    </div>
                  </div>

                  {/* Small Status Indicator */}
                  <div className="flex items-center gap-1.5 shrink-0 bg-neutral-900/80 px-2.5 py-1 rounded-full border border-neutral-800">
                    <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dotBg}`} />
                    <span className={`text-xs font-semibold ${statusInfo.color}`}>{statusInfo.label}</span>
                  </div>
                </div>

                {/* Middle Info Row */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800/60 text-xs">
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Industry</span>
                    <span className="px-2 py-0.5 bg-neutral-800/40 text-neutral-300 rounded text-[11px] capitalize inline-block">{company.industry}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block mb-0.5">Jobs Posted</span>
                    <span className="px-2 py-0.5 bg-neutral-800/40 text-neutral-300 rounded text-[11px] capitalize inline-block">{company.jobCount}</span>
                  </div>
                  <div className="col-span-2 mt-1">
                    <span className="text-neutral-500 block mb-0.5">Submitted On</span>
                    <span className="text-neutral-300 font-medium">{formatDate(company.createdAt?.$date || company.createdAt)}</span>
                  </div>
                </div>

                {/* Bottom Section: Action Buttons */}
                <div className="flex gap-2 pt-3 border-t border-neutral-800/60">
                  {company.status?.toLowerCase() !== "approved" && (
                    <Button
                      size="sm"
                      variant="light"
                      onClick={() => handleApprove(companyId)}
                      className="flex-1 bg-emerald-950/30 hover:bg-emerald-900/50 text-emerald-500 border border-emerald-900/60 rounded-md py-2 text-xs font-semibold transition-colors"
                    >
                      Approve
                    </Button>
                  )}
                  {company.status?.toLowerCase() !== "rejected" && (
                    <Button
                      size="sm"
                      variant="light"
                      onClick={() => handleReject(companyId)}
                      className="flex-1 bg-rose-950/20 hover:bg-rose-900/40 text-rose-500 border border-rose-900/40 rounded-md py-2 text-xs font-semibold transition-colors"
                    >
                      Reject
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CompanyTable;
