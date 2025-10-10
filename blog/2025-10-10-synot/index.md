---
title: How SYNOT TECH scaled test automation (& visual testing)
description: A story of evolving QA maturity in a complex iGaming environment and how visual testing helped make automation more robust.
slug: synot-tech-test-automation-wopee
authors: [marcel]
tags: [case-study, visual-testing, autonomous-testing, wopee, qa, automation]
# image: ./images/synot-cover.png
---

How SYNOT TECH scaled test automation (and visual testing) using Wopee.io

> A story of evolving QA maturity in a complex iGaming environment and how visual testing helped make automation more robust.

<!--truncate-->

## Complexity, scale & smarter QA

Synot Tech is no small operation. As part of the SYNOT Group, they deliver full‑stack iGaming solutions. From lotteries and casino games to sports betting and omni‑channel platforms. They operate in regulated markets across Europe, integrate with numerous game providers (over 9,500 games across 80+ providers), and support modular, API‑based architectures. ￼

In such environments, every UI change, integration, data flow, and presentation variant can introduce risk. For Synot's QA leaders, Jiří Malý (Jirka) and Jakub Miakyš, automation was already essential. But scaling it wisely, reducing brittle tests, and weaving in visual verification became the next frontier. Enter Wopee.io.

In this article, you'll get an inside look at:

1. How Synot's QA teams approach test automation and coverage
2. Why they chose Wopee.io to strengthen visual testing and reliability
3. The practical ways Wopee.io fits into Synot’s workflows
4. Concrete results: metrics, scale, and real-world impact
5. The challenges, lessons learned, and Synot’s ongoing roadmap in QA

## Testing at Synot: Strategy, Coverage & Roles

### Teams & testing scope

Synot's QA function comprises about 24 specialists distributed across subteams. Each subteam focuses on parts of the product (casino engine, sports betting, frontends, etc.), but all are aligned under a unified testing strategy.

The testing spectrum includes:

- Manual test case design (the foundation)
- UI / web + responsive mobile testing
- API / backend testing
- Growing investment in native mobile app coverage
- Performance / load testing
- Monitoring and anomaly detection in production

To foster a strong automation culture, Synot encourages all QA engineers: junior, mid, and senior - to participate in automation: some writing new tests, others maintaining pipelines, or triaging failures.

<div style={{ display: 'flex', justifyContent: 'center', width: '50%', margin: '0 auto' }}>
  <img
    src={require('./jirka.png').default}
    alt="Jiří Malý"
    style={{
      maxWidth: '50%',
      borderRadius: '50%',
      width: '100%',
      aspectRatio: '1 / 1',
      objectFit: 'cover'
    }}
  />
</div>

<div style={{ textAlign: 'center', margin: '1rem 0' }}>

### Jiří Malý, QA Tech Test Lead | Technical Test Analyst

> ## "We're proud to say that in a relatively short time, we've succeeded in training all QA engineers to be involved in automation."

</div>

Cross-team synergy is a priority: teams share frameworks, patterns, and best practices so that tests are consistent and maintainable across the company.

### Tool Stack & Observability

Synot's existing architecture and tool choices reflect their scale and needs:

| **Area**                         | **Tool / Approach**          |
| -------------------------------- | ---------------------------- |
| Web / UI Automation              | Playwright + NUnit           |
| API Testing                      | Postman / Newman             |
| Native Mobile                    | Appium + LambdaTest          |
| Load / Performance               | K6                           |
| Monitoring / Observability       | Grafana, Kibana, Zabbix      |
| CI / Pipelines                   | Azure DevOps                 |
| Visual / Screenshot Validation   | **Wopee.io**                 |
| Data & Test Metadata Integration | GraphQL + pipeline reporting |

In practice, Wopee.io is embedded into their CI pipelines. Any test run that includes visual validation sends screenshots to Wopee.io; differences or new screens are flagged. QA engineers review via Wopee Commander, accept or reject baselines, and failures are surfaced back into Azure DevOps. All relevant metadata (tags, tolerances) flow through GraphQL connections.

### Why Wopee.io: What stood out

Based on their evaluation process, Jirka and Jakub identified several key factors that made Wopee.io the right choice for Synot:

1. **Simple integration** - Both into their framework and individual tests
2. **Web-based management** - Reference screenshot management through an intuitive web client
3. **Device abstraction** - Wopee.io handles differences between devices intelligently
4. **Low maintenance burden** - They wanted visual testing without heavy maintenance overhead
5. **Vendor responsiveness** - Wopee.io team were able to respond quickly with fixes and workarounds

## How Wopee.io works inside Synot

Here's how Wopee.io integrates into their daily workflow:

1. Testers work with Wopee.io through their test maintenance and pipeline monitoring
2. Wopee.io's output is sent via GraphQL into their Azure DevOps pipeline reports
3. When there's a screenshot with differences or a new (unapproved) screenshot, the test is marked as failed
4. Through a URL in the report, testers go directly to Wopee.io Commander to analyze differences or identify new reference screenshots
5. The process supports custom tags to distinguish which part of the application, customer, or environment the screenshot was created for

<div style={{ display: 'flex', justifyContent: 'center', width: '50%', margin: '0 auto' }}>
  <img
    src={require('./jakub.png').default}
    alt="Jakub Miakyš"
    style={{
      maxWidth: '50%',
      borderRadius: '50%',
      width: '100%',
      aspectRatio: '1 / 1',
      objectFit: 'cover'
    }}
  />
</div>

<div style={{ textAlign: 'center', margin: '1rem 0' }}>

### Jakub Miakyš, QA Automation specialist & lead

> ## "Before implementing visual testing from Wopee.io, it wasn't possible to test these scenarios at all."

</div>

The baseline version control and ignored-area features reduce "noise" from trivial differences (e.g. timestamps, banner shifts) so QA isn't constantly approving minor deltas.

If a baseline update is accepted, Wopee.io updates its internal reference and subsequent runs consider it the new ground truth.

## Impact & metrics (what changed)

Synot's team generously shared results which bring this transformation out of the realm of theory:

- 1,600+ automated regression tests now exist across multiple teams
- ~200 approved visual baselines in Wopee.io
- Regression suites run daily on integration environments
- During release prep, runs are duplicated against UAT environments
- For smaller customers, test execution times remain in the low‑minute range; for the largest suites, they stay within ~30 minutes
- Visual test adoption is nearly universal among pipeline‑maintaining QA engineers
- Maintenance burden (approving new baselines, triaging diffs) is significantly lower than prior visual tools or in-house screenshot frameworks

These metrics show that visual validation scaled without breaking the process or blowing up maintenance costs.

## Q&A with Jiří Malý and Jakub Miakyš

<div style={{ display: 'flex', justifyContent: 'center', width: '100%', margin: '0 auto' }}>
  <img
    src={require('./jirka-a-jakub.jpg').default}
    alt="Jiří Malý and Jakub Miakyš"
    style={{
      maxWidth: '80%',
      borderRadius: '5%',
      width: '100%',
      objectFit: 'cover'
    }}
  />
</div>

To better understand the transformation journey and the role Wopee.io played in it, we sat down with Jiří (Jirka) and Jakub to hear their perspective on what they've achieved, the challenges they face, and where they're headed next.

### What are you most proud of from Synot's test transformation?

**Jirka and Jakub:** We joined SYNOT TECH in February 2024 with a clear mission: to revise the existing automation project, establish proper processes, and ensure the right tools were in place for future development. Most importantly, we wanted to train and involve as many QA engineers as possible in the automation process.

We're proud to say that in a relatively short time, we've succeeded. Today, the majority of our QA colleagues are actively involved in automation - whether developing new tests or managing daily test pipeline operations. Within our subteams, we collaborate on advancing automation as a whole and leverage synergies between teams. The result is a unified approach to automation across teams, sharing of know-how, and of course, shared code and methods. This foundation also enables us to continuously develop and educate our QA engineers.

### When did you start using Wopee.io?

**Jirka:** We officially started using Wopee.io in May 2025, though we began running our first proof-of-concepts around February and March. We wanted to make sure it would fit our needs before fully committing to it.

### Why did you choose Wopee.io specifically?

**Jirka:** Simple integration was key - both into our framework and into the tests themselves. Reference screenshot management happens through a web client, which makes it very convenient and intuitive for our QA engineers.

Another big advantage is that testers don't have to worry about which device the reference screenshot was taken on - whether on someone's local computer or on the pipeline. Wopee handles those differences between devices intelligently.

Our goal was to increase test coverage and reliability through visual testing, but we didn't want to adopt a solution that would become a maintenance burden. With Wopee, that hasn't been an issue.

**Jakub:** Compared to other solutions, I see a huge advantage in the speed and ease of approving new screenshots. The web client has simple tools for defining ignored areas and overall management of reference screenshots. Another major advantage is automatic resolution management, which many competing solutions don't handle.

### How many team members currently use Wopee.io?

**Jirka:** Actually, all testers who are involved in test maintenance and pipeline monitoring work with Wopee. We send Wopee's output via GraphQL into our reports within Azure DevOps pipelines. If there's a screenshot with differences or a new (not yet approved) screenshot, we mark the test as failed. Through a URL in the report, or when creating a new test, the tester goes directly to Wopee Commander, where they analyze any differences or identify new reference screenshots.

### What are the top 3 benefits or improvements you've seen with Wopee.io?

**Jirka:** First, **speed** - both in terms of Wopee's screenshot evaluation, reference screenshot creation, and the creation of visual tests themselves. Thanks to Wopee's GraphQL integration into our automation framework, we've wrapped all necessary steps into one universal method. We simply use it in automated tests and, if needed, extend the visual test with custom tags or tolerance thresholds via parameters. We use custom tags to distinguish which part of the application, customer, or environment the screenshot was created for.

Second, **technology support** was a deciding factor for us. Wopee offered integration with Playwright and, crucially, was able to accommodate us by preparing an SDK for .NET, which we use in our test framework. We didn't want to go with a solution that didn't support .NET, as that would mean maintaining a separate test suite in a different technology - double the maintenance, double the pipeline monitoring, etc. Since this was a new SDK implementation from Wopee's side, there were some bugs, but Marcel and his team were able to respond quickly with fixes or functional workarounds. This customer-centric approach was quite critical for us during the selection process.

Third, working with **ignored areas** is a major benefit. You simply mark the area in Wopee Commander and approve the screenshot - it's literally a matter of seconds.

**Jakub:** Wopee has proven to be an excellent helper especially in cases where the page context doesn't change - meaning all elements are essentially the same, but the visual is different. A typical case is switching a game to fullscreen. Before implementing visual testing from Wopee, it wasn't possible to test these scenarios at all.

### Can you share some interesting statistics?

**Jirka:** Currently, we have over 1,600 regression automated tests total - that's the sum across all our teams. For some customers, we have dozens of tests; for customers who use multiple products from us, we have hundreds of tests. Execution time varies accordingly. For customers with dozens of tests, we try to keep execution time in the higher single-digit minutes; for the largest test suites, we comfortably fit within just over 30 minutes.

**Jakub:** Within Wopee, we currently have just under 200 approved baselines - so we're checking nearly 200 screenshots across environments and products. The entire regression suite runs regularly against integration environments, so all registered screenshots are checked on a daily basis. During release preparation, test runs are duplicated and screenshot validation also runs against UAT environments.

### What challenges remain, and what would you like to improve going forward?

**Jakub:** Initially, we naturally used UI clicking for data preparation. Now that our solution has grown to such a large number of tests, from a time-execution perspective, it's essential to replace these steps with API methods for data preparation. We also need to prepare solutions for more advanced scenarios that require third-party integrations. Since we don't have control over external outputs, we should mock this data appropriately.

**Jirka:** I agree with Jakub, and I'd add that over the past year, we've delivered a significant number of tests across teams. However, this also brings challenges around test maintenance and optimization from a time-execution perspective - essentially, how long the tests take to run. This ties into challenges like preparing independent test data so that individual test runs don't interfere with each other.

### What's your vision for future development and improvements?

**Jirka:** We're currently working on developing automated tests for the production environment as well. These are used during new version deployments, and our support teams also utilize them when investigating and verifying the functionality of our applications. For production testing, we're already planning to leverage Wopee.io's capabilities to ensure visual consistency and catch any deployment-related issues early.

**Jakub:** We're working on deepening the integration of test automation into our development process. Our goal is to incorporate automated testing from the very beginning - during requirements gathering and design phases. This shift-left approach will help us catch issues earlier and make our overall quality process more proactive rather than reactive.

### One more thing - what do you personally enjoy most about working in QA?

**Jirka:** What I enjoy most about QA work is that there's always something to improve - the work isn't limited in the sense that we could say "this is enough from an automation perspective." Since I like to develop and learn new things, QA work is ideal in this regard, especially in the last few years with the rapid rise of automation and AI. I'm also glad that QAs and testers are now seen as equal partners within development teams.

**Jakub:** The biggest motivation for us is when junior colleagues come with their own ideas, want to learn new things, and aren't afraid to propose and implement new technologies - like Wopee.io, for example. It energizes me when my younger colleagues come to me with ideas that improve our code, simplify work for others, or just with ideas I hadn't thought of myself. The best part is when our team grows not just in numbers, but especially in skills.

## Lessons, challenges & future roadmap

### Key insights from their journey

1. **Team-wide adoption works**: All testers involved in test maintenance and pipeline monitoring now work with Wopee
2. **Speed matters**: Wopee.io's screenshot evaluation, reference creation, and visual test creation are significantly faster
3. **Technology alignment is crucial**: Wopee.io's .NET SDK support was a deciding factor, avoiding the need for separate test suites
4. **Customer support makes a difference**: Marcel and his team's quick response to issues was critical during their selection process

### Current challenges and improvement areas

**Jakub:** The main challenge is moving from UI clicking for data preparation to API methods, especially as the solution has grown to a large number of tests. They also need to prepare solutions for third-party integrations where they don't have control over external outputs - these should be mocked appropriately.

**Jirka:** With the significant number of tests delivered across teams, there are challenges around test maintenance and optimization from a time-execution perspective, particularly around preparing independent test data so individual test runs don't interfere with each other.

### Future development plans

**Jirka:** They're currently working on developing automated tests for the production environment, used during new version deployments. Their support teams also utilize these tests for investigating and verifying application functionality. For production testing, they're planning to leverage Wopee.io's capabilities.

**Jakub:** They're working on deepening the integration of test automation into their development process, with the goal of incorporating automated testing from the very beginning - during requirements gathering and design phases.

### What do you personally enjoy most about working in QA?

**Jirka:** What I enjoy most about QA work is that there's always something to improve - the work isn't limited in the sense that we could say "this is enough from an automation perspective." Since I like to develop and learn new things, QA work is ideal in this regard, especially in the last few years with the rapid rise of automation and AI. I'm also glad that QAs and testers are now seen as equal partners within development teams.

**Jakub:** The biggest motivation for us is when junior colleagues come with their own ideas, want to learn new things, and aren't afraid to propose and implement new technologies - like Wopee.io, for example. It energizes me when my younger colleagues come to me with ideas that improve our code, simplify work for others, or just with ideas I hadn't thought of myself. The best part is when our team grows not just in numbers, but especially in skills.

<div style={{ display: 'flex', justifyContent: 'center', width: '50%', margin: '0 auto' }}>
  <img
    src={require('./jirka.png').default}
    alt="Jiří Malý"
    style={{
      maxWidth: '50%',
      borderRadius: '50%',
      width: '100%',
      aspectRatio: '1 / 1',
      objectFit: 'cover'
    }}
  />
</div>

<div style={{ textAlign: 'center', margin: '1rem 0' }}>

### Jiří Malý, QA Tech Test Lead | Technical Test Analyst

> ## "Marcel and his team were able to respond quickly with fixes"

</div>

## Conclusion

Synot's journey is a powerful example: in a domain marked by complexity, change, regulatory constraints, and multiple product lines, they chose not just to scale automation — but to evolve it into a more intelligent, maintainable, and visually aware practice.

Wopee.io wasn't merely a tool — it was a catalyst for maturing QA culture. The team transformed visual testing from "nice to have" into an integrated, reliable pillar of their pipeline.

If your team maintains UI layers, cares about consistent user experience, or struggles with brittle screenshot tests it's worth seeing how Wopee.io (or a modern visual test platform) might help you evolve forward.
