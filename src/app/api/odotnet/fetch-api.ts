//This page has the functions that call specific api from O.NET

"use server";

import { JobKeyword, CareerSection } from "./enums";

interface ODOTNetCredentials {
  Authorization: string;
}

async function fetchData(
  url: string,
  credentials: ODOTNetCredentials
): Promise<Response> {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...credentials,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${url}. Status: ${res.status}`);
  }

  return res;
}

// Function to fetch job titles by keyword
export async function odotnetKeyword(keyword: JobKeyword): Promise<any> {
  const credentials: ODOTNetCredentials = {
    Authorization: `Basic ${process.env.ODOTNET_CREDENTIALS}`,
  };

  const res = await fetchData(
    `https://services.onetcenter.org/ws/mnm/search?keyword=${keyword}`,
    credentials
  );
  const data = await res.json();
  // console.log(data);
  return data;
}

// Function to fetch career overview (description, tasks)
export async function odotnetCareerOverview(
  code: string,
  careerSection?: CareerSection
): Promise<any> {
  const credentials: ODOTNetCredentials = {
    Authorization: `Basic ${process.env.ODOTNET_CREDENTIALS}`,
  };

  const endpoint = careerSection
    ? `https://services.onetcenter.org/ws/mnm/careers/${code}/${careerSection}`
    : `https://services.onetcenter.org/ws/mnm/careers/${code}/report`;

  const res = await fetchData(endpoint, credentials);
  const data = await res.json();

  return data;
}
