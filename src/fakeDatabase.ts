const ITDesignerJobDescription = {
  code: "15-1255.00",
  career: {
    code: "15-1255.00",
    title: "Web & Digital Interface Designers",
    tags: { bright_outlook: true, green: false, apprenticeship: true },
    also_called: {
      title: [
        "Web Architect",
        "Web Design Specialist",
        "Web Designer",
        "Webmaster",
      ],
    },
    what_they_do:
      "Design digital user interfaces or websites. Develop and test layouts, interfaces, functionality, and navigation menus to ensure compatibility and usability across browsers or devices. May use web framework applications as well as client-side code and processes. May evaluate web design following web and accessibility standards, and may analyze web use metrics and optimize websites for marketability and search engine ranking. May design and test interfaces that facilitate the human-computer interaction and maximize the usability of digital devices, websites, and software with a focus on aesthetics and design. May create graphics used in websites and manage website content and links.",
    on_the_job: {
      task: [
        "Collaborate with management or users to develop e-commerce strategies and to integrate these strategies with Web sites.",
        "Collaborate with web development professionals, such as front-end or back-end developers, to complete the full scope of Web development projects.",
        "Communicate with network personnel or Web site hosting agencies to address hardware or software issues affecting Web sites.",
      ],
    },
    career_video: true,
    resources: {
      resource: [
        {
          href: "https://services.onetcenter.org/ws/mnm/careers/15-1255.00/technology",
          title: "Technology",
        },
        {
          href: "https://services.onetcenter.org/ws/mnm/careers/15-1255.00/education",
          title: "Education",
        },
        {
          href: "https://services.onetcenter.org/ws/mnm/careers/15-1255.00/job_outlook",
          title: "Job Outlook",
        },
        {
          href: "https://services.onetcenter.org/ws/mnm/careers/15-1255.00/check_out_my_state",
          title: "Check Out My State",
        },
        {
          href: "https://services.onetcenter.org/ws/mnm/careers/15-1255.00/explore_more",
          title: "Explore More",
        },
      ],
    },
  },
  technology: {
    category: [
      {
        unspsc: 43232408,
        title: { name: "Web platform development software" },
        example: [
          { hot_technology: "Bootstrap", name: "Bootstrap" },
          { hot_technology: "React", name: "React" },
        ],
      },
      {
        unspsc: 43232306,
        title: { name: "Data base user interface and query software" },
        example: [
          { name: "Blackboard software" },
          { hot_technology: "Transact-SQL", name: "Transact-SQL" },
        ],
      },
      {
        unspsc: 43232402,
        title: { name: "Development environment software" },
        example: [
          { hot_technology: "Apache Maven", name: "Apache Maven" },
          {
            hot_technology: "Oracle Java 2 Platform Enterprise Edition J2EE",
            name: "Oracle Java 2 Platform Enterprise Edition J2EE",
          },
        ],
      },
    ],
  },
  education: {
    job_zone: 4,
    apprenticeships: {
      title: [{ rapids: "2098CB", name: "User Experience Designer" }],
    },
  },
  job_outlook: {
    outlook: {
      description: "New job opportunities are very likely in the future.",
      category: "Bright",
    },
    bright_outlook: {
      description: "This career will grow rapidly in the next few years.",
      category: ["Grow Rapidly"],
    },
    salary: {
      soc_code: "15-1255",
      annual_10th_percentile: 43100,
      annual_median: 83240,
      annual_90th_percentile: 166180,
      hourly_10th_percentile: 20.72,
      hourly_median: 40.02,
      hourly_90th_percentile: 79.9,
    },
  },
  explore_more: {
    careers: {
      career: [
        {
          href: "https://services.onetcenter.org/ws/mnm/careers/15-1251.00/",
          code: "15-1251.00",
          title: "Computer Programmers",
          tags: { bright_outlook: false, green: false, apprenticeship: true },
        },
        {
          href: "https://services.onetcenter.org/ws/mnm/careers/27-1024.00/",
          code: "27-1024.00",
          title: "Graphic Designers",
          tags: { bright_outlook: false, green: false, apprenticeship: true },
        },
        {
          href: "https://services.onetcenter.org/ws/mnm/careers/15-1252.00/",
          code: "15-1252.00",
          title: "Software Developers",
          tags: { bright_outlook: true, green: false, apprenticeship: true },
        },
        {
          href: "https://services.onetcenter.org/ws/mnm/careers/15-1299.01/",
          code: "15-1299.01",
          title: "Web Administrators",
          tags: { bright_outlook: true, green: false, apprenticeship: false },
        },
        {
          href: "https://services.onetcenter.org/ws/mnm/careers/15-1254.00/",
          code: "15-1254.00",
          title: "Web Developers",
          tags: { bright_outlook: true, green: false, apprenticeship: false },
        },
      ],
    },
    industries: {
      soc_code: "15-1255",
      industry: [
        {
          href: "https://services.onetcenter.org/ws/mnm/browse/54",
          percent_employed: 28,
          code: 54,
          title: "Professional, Science, & Technical",
        },
        {
          href: "https://services.onetcenter.org/ws/mnm/browse/51",
          percent_employed: 19,
          code: 51,
          title: "Media & Communication",
        },
      ],
    },
  },
  where_do_they_work: {
    industry: [
      {
        href: "https://services.onetcenter.org/ws/mnm/browse/54",
        percent_employed: 28,
        code: 54,
        title: "Professional, Science, & Technical",
      },
      {
        href: "https://services.onetcenter.org/ws/mnm/browse/51",
        percent_employed: 19,
        code: 51,
        title: "Media & Communication",
      },
    ],
  },
};

export function getAllJobData() {
  return ITDesignerJobDescription;
}
