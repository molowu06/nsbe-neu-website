import { NextResponse } from "next/server";

const GIVING_DAY_URL =
  "https://givingday.northeastern.edu/s/sfsites/aura?r=5&aura.ApexAction.execute=1";

const MESSAGE = {
  actions: [
    {
      id: "213;a",
      descriptor: "aura://ApexActionController/ACTION$execute",
      callingDescriptor: "UNKNOWN",
      params: {
        namespace: "",
        classname: "cfg_FundListingController",
        method: "getAggregateTotalsForDesignation",
        params: {
          designationCode: "DN4507-83",
        },
        cacheable: false,
        isContinuation: false,
      },
    },
  ],
};

const AURA_CONTEXT = {
  mode: "PROD",
  fwuid:
    "TXFWNVprQUZzQnEtNXVXYTFLQ2ppdzJEa1N5enhOU3R5QWl2VzNveFZTbGcxMy4tMjE0NzQ4MzY0OC4xMzEwNzIwMA",
  app: "siteforce:communityApp",
  loaded: {
    "APPLICATION@markup://siteforce:communityApp":
      "1542_MvzRU4EK4FAU3HkS3YNvyA",
  },
  dn: [],
  globals: {},
  uad: true,
};

export async function GET() {
  try {
    const body = new URLSearchParams({
      message: JSON.stringify(MESSAGE),
      "aura.context": JSON.stringify(AURA_CONTEXT),
      "aura.pageURI": "/s/fund-details?dc=DN4507-83",
      "aura.token": "null",
    });

    const response = await fetch(GIVING_DAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "application/json",
        Origin: "https://givingday.northeastern.edu",
        Referer:
          "https://givingday.northeastern.edu/s/fund-details?dc=DN4507-83",
      },
      body,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Upstream request failed: ${response.status}`);
    }

    const data = await response.json();

    const totals = data?.actions?.[0]?.returnValue?.returnValue;

    const raised = Number(totals?.totalDonationAmount ?? 0);
    const donors = Number(totals?.numberOfDonors ?? 0);

    return NextResponse.json({
      raised,
      donors,
      goal: raised,
      designationCode: "DN4507-83",
      lastUpdated: new Date().toISOString(),
      live: true,
    });
  } catch (error) {
    console.error("Giving Day fetch failed:", error);

    return NextResponse.json(
      {
        raised: 3988,
        donors: 167,
        goal: 10000,
        designationCode: "DN4507-83",
        lastUpdated: new Date().toISOString(),
        live: false,
        fallback: true,
      },
      { status: 200 }
    );
  }
}