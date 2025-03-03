---
title: "Zero to Coder: You, Me, and Cursor IDE"
date: '2025-03-03'
excerpt: I ran a workshop to get beginners coding using AI. Here's how it went.
author:
  name: Jethro
  avatar: /me2.jpg
tags:
  - Teaching
  - Vercel
  - Cursor-IDE
  - Lovable.dev
  - Langchain/Pinecone
image: /z2c.jpg
---

## Teaching Mindset

When I started building [WhatGov](https://whatgov.co.uk) last year, I was exactly where my workshop participants started this weekend - typing frenetically into ChatGPT things like "What do I need to know to build an app?", and "Provide a comprehensive guide to Git for a beginner".

What rocket-propelled by learning was going to [Campaign Lab](campaignlab.uk), who make free and open-source tools for progressive organisations. I honestly hadn't thought much about campaigning (or even politics) before arriving, but it turns out they'd thought a lot about making it easy for programmers to give meaningful contributions to the ecosystem. I built the [Electoral Commission Assistant](https://ec.civita.co.uk/) by forking a pinecone/langchain repo I'd found online, then I built [Votespeaker](votespeaker.civita.co.uk) from scratch to get familiar with React and the OpenAI API. I'm told the latter was used by an MP throughout the July 2024 election campaign, and was (amazingly) relevant enough to present in front of a room full of backers just last week. 

<div class="testimonial-right">

> "Jethro's workshop and introduction to tools really helped me reduce the friction and frustration I've always had with building anything technical with code. The use of AI tools for generating leads for problem solving makes the process much more… solvable."  
> — **Anonymous Participant**

</div>

The hard thing to overcome when you start a new digital skill is the temptation to hide behind courses, and to dedicate valuable learning time figuring out the *best* way to learn. If the task involves typing and/or abstract thinking, it makes us think the answer can be found in MORE abstract thinking. 

Yet, the solution is somehow obvious if you're learning a sport, a language, or a manual skill - you get better at the skill by... doing the skill. 

This isn't to say learning the context of coding tools - or doing an intensive coding course - is useless (This is the last thing an advocate for using AI to learn to code should be saying). But that the context is *best* learned by interacting with the system, and code is best understood by watching what happens when you tweak it to see what breaks. 

The hard challenge as I see it is getting over the desire to let your mind wander when you don't see an obvious route to your goal. But with AI tools you can take enormous leapfrogs towards your goal. It feels naughty. It feels exciting. So even if Claude wrote the whole darned thing, the rapid tangible results, and the feeling of 'I ~~built~~ ~~co-built~~ caused this' gave people enough of a thirst for more that the problem-solving mindset slipped in almost implicitly. 

> "Got an error? Don't know how to host your app? You know what to ask, and it's not me!"

## Workshop Overview: 0 to Website in 90 minutes

I was kindly given the hall of [Newspeak House](https://newspeak.house) for the event. This was a last-minute switch from the comparatively small classroom, since the workshop was so oversubscribed!

<div class="testimonial-left">

> "Good mix of solo dev & problem solving with support there. Turn up & don't be scared."  
> — **Tom**, who built [Recipe-routine-saver.vercel.app](https://recipe-routine-saver.vercel.app)

</div>

Most of the people who came had no coding experience whatsoever, though some had a little python or at least some digital skills using Wix and nocode. 

Helping me out was [Coefficient](coefficient.ai) CEO John Sandall, a friend and mentor who's very positive on using Cursor to boost his team's productivity. 

<div class="learning-path">

### The Learning Path

The shift in teaching approach is that we came in from the 'top down' - starting with something that basically works, then guiding the AI with questions. 

The key here is that AI still makes tons of mistakes. Highlighting this at the start meant people didn't just sit back and do nothing - they stayed engaged to solve the inevitable problems. For this reason I gently discouraged using Cursor's agent mode, but it also seemed to be doing the job for some people.

| Step | Goals | Key Moments |
|:------|:------|:-----------|
| **Breaking the Ice** | • Prompt a website in [Lovable.dev](https://lovable.dev)<br>• Have a sense of owenership about something | • "I made this happen!"<br>• First Github commit |
| **Cursor-IDE** | • Setting up Cursor IDE<br>• Learning Git basics | • "The AI tells me what to do"<br>• Overcoming installation hurdles   |
| **Deployment** | • Hosting with Vercel<br>• Domain setup | • Live website moment<br>• The "aha!" experience |
| **Beyond Basics** | • Intro to Supabase<br>• Database concepts | • Working at own pace<br>• Future learning paths |

In reality, people moved at different speeds - the first were done in 90m, then people gradually got the finish line in clumps until everyone had a project hosted on Vercel. The main schism was getting git installed - myself and John (both Mac users) were taken by surprise discovering that Windows users needed to restart Cursor to get their terminal to recognise the git installation. Beyond that, the main obstacle was focus: Some people clearly came with the internal drive to get to the end goal fast. Others enjoyed the social side more (not unfamiliar from hackathons). 

<div class="testimonial-right">

> "Really accessible session, felt very well supported to learn how to code using AI. Very impressed."  
> — **Alastair**, who created [Greater Manchester Assembly Helper](https://greater-manchester-assembly-helper.vercel.app/#)

</div>

Nonetheless, by the end of the session everyone had an app hosted on Vercel (A couple of attendees were happy to share theirs, which you can find below if they're still live).

I encouraged the early finishers moved in their own direction, rather than tramline them to something specific. The most popular next step was databases, with one or two thinking about authentication. For both of these they ended up using Supabase, which also neatly integrates with Vercel. 

</div>

<div class="testimonial-left">

> "I actually made something and feel I have the confidence to use AI tools to try and build! [...] Thank you Jethro."  
> — **Workshop Participant**

</div>

In reality, people moved at different speeds - the first were done in 90m, then people gradually got the finish line in clumps until everyone had a project hosted on Vercel. The main schism was getting git installed - myself and John (both Mac users) were taken by surprise discovering that Windows users needed to restart Cursor to get their terminal to recognise the git installation. Beyond that, the main obstacle was focus: Some people clearly came with the internal drive to get to the end goal fast. Others enjoyed the social side more (not unfamiliar from hackathons). 

## My Key Takeaways 

• This format works! There's potential here for a community<br>• I need a presentation (or similar) to give structure and keep people on track<br>• People need a little more direction/ structure in the second half<br>• People would be happy to pay for this<br>• Windows users to restart their IDE to get Git working.

## What's Next

Given the enthusiastic feedback and suggestions to monetize future sessions, I'm planning to:
- Run these regularly
- Add intermediate workshops/co-working sessions
- Create online resources