# SMS Split Preview Tool

## Goal
To have a simple webpage to help see how an SMS is split into several pieces.

Since SMS has a character limit, typically 70 chars, messages longer than that are split into multiple SMS.

Depending on the carrier, this may result in multiple messages or a merged long one.

The tool aims to help visualize the actual SMS behind the scenes and assist users in formatting or adjusting their messages to prevent word splitting between SMS.

## UI

- Split the page into two panes: a simple input on the left-hand side and a preview of the message on the right-hand side.
- In the preview pane, use background color to indicate which SMS segment each part of the message is in.
  For example, the first 70 chars are colored cyan, while another 70 chars after that are in pink.
  Use light bg color to prevent visual conflict.
- Have an input to customize the SMS character limit. This makes testing easier.

## Some thoughts about implementation
- In Taiwan + Chinese language usage, treat SMS as UCS-2.
  - Default segment limits: 70 UCS-2 chars for a single SMS, 67 UCS-2 chars per segment when concatenated.
  - For emoji and other non-BMP characters, count UTF-16 code units (surrogate pairs count as 2).
  - Use UTF-16 code unit length to split.
- I pre-installed lodash because we should use debounce to render the preview only after the user stops typing. Start with a 500ms debounce delay.

## Reference
- [What is GSM-7 character encoding? | Twilio](https://www.twilio.com/docs/glossary/what-is-gsm-7-character-encoding)
- [What is UCS-2 Character Encoding? | Twilio](https://www.twilio.com/docs/glossary/what-is-ucs-2-character-encoding)
