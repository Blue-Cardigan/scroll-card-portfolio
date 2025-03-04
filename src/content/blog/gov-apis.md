---
title: "UK Parliament Hansard API: A short list"
date: '2025-02-28'
excerpt: "The current endpoint for the UK Parliament Hansard API, plus limitations and more data sources."
author:
  name: Jethro
  avatar: /me2.jpg
tags:
  - Hansard
  - Parliament.uk
  - UK Parliament
  - Hansard API
  - Swagger
image: https://upload.wikimedia.org/wikipedia/commons/3/3b/Houses_of_Parliament_in_2022_%28cropped%29.jpg
---

## The Official Hansard API

The UK Parliament maintains an official Swagger API for accessing Hansard data:

**[https://hansard-api.parliament.uk/swagger/ui/index#/](https://hansard-api.parliament.uk/swagger/ui/index#/)**

(I said it was a short list)

This API provides programmatic access to parliamentary debates, questions, and other proceedings.

## API Structure and Usage

Debates in the API have unique UUIDs, with parent/child relationships for certain content types. Questions, in particular, are organised hierarchically.

### Example Request

```http
GET https://hansard-api.parliament.uk/debates/debate/{uuid}.json
```

I've discovered some important limitations of the search endpoint:

- Results are limited to 4 items (matching the [official site search](https://hansard.parliament.uk/search))
- Several filter parameters seem to work:
  - Debate type filters (written statements, petitions, divisions) don't work
  - The 'date' parameter is non-functional (use startdate/enddate instead)
  - Probably more (:

## Background

I had a lovely chat last week with the Director of Data & Technology at 
the House of Commons Library. It was very enlightening. He also sent me 
these [weeknotes](https://ukparliament.github.io/ontologies/meta/weeknotes/), which have entirely restored my faith in the humanity of the Parliament's developers. 

I mentioned a struggle I'd had when building [Whatgov](https://Whatgov.co.uk), which is that the swagger endpoints to get Hansard data aren't documented anywhere online. I was told about it by some friends in the government Incubator for AI ([I.AI](https://ai.gov.uk/)), and have since been passing it around Whatsapp group chats like an member's drunk texts about Donald Trump. 

(I double checked for this post, and it turns out it's actually documented in an FOI [here](https://www.parliament.uk/globalassets/documents/foi/house-of-lords-foi-and-data-protection/foi-responses---calendar-year-2023/foi-4148---response.pdf))

He explained a previous plan by another team to replace this endpoint with another - clearly this plan made it exactly half-way to execution. 

## Additional Parliament Data Sources

If you're working with UK Parliamentary data, these official APIs may also be useful:

- [Oral Questions and Motions](https://oralquestionsandmotions-api.parliament.uk) - Access to oral questions and early day motions
- [Bills and Amendments](https://bills-api.parliament.uk/index.html) - Track ongoing bills and their amendments
- [Committee Information](https://committees-api.parliament.uk/index.html) - Data on committee members and business
- [Parliamentary Calendar](https://whatson-api.parliament.uk/calendar/events) - Upcoming and past parliamentary events

## More Government Data Resources

You might also enjoy [this side-quest.](https://github.com/i-dot-ai/awesome-gov-datasets). It's a set of broader UK government datasets published by some friends in the Incubator for AI. 

---

If this was useful... [follow me on X](https://x.com/JethroJethroR) or [find me around](https://www.campaignlab.uk/).