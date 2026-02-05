# SMS Split Preview Tool

## Goal
To have a simple webpage to help see how a sms got split to several pieces.

Since sms got character limit, typically 70 chars, message longer than that got split into multiple sms.

With different carrier, this may result in multi messages or a merged long one.

The tool aims to help visualize the actual sms under the scene, assist user to format or adjust their message to prevent word splitting between sms.

## UI

- Split the page into two pane, on the left hand side, a simple input, on the right hand side, a preview of the message.
- In the preview pane, use background color to indicate which sms the part of the message is in.
  For example, the first 70 chars is colored cyan, another 70 chars after that is in pink.
  Use light bg color to prevent visual conflict.
- Have a input to customized the char limit of the sms, this would make testing more easier.

## Some thoughts about implementation
- In Taiwan + Chinese language usage, treat SMS as UCS-2.
  - Default segment limits: 70 UCS-2 chars for a single SMS, 67 UCS-2 chars per segment when concatenated.
  - For emoji and other non-BMP characters, count UTF-16 code units (surrogate pairs count as 2).
  - Use UTF-16 code unit length to split.
- I pre-installed lodash, cause I think we should use debounce to only start render preview user stopped typing, maybe set the debounce time to 500ms at first.

## Reference
- [What is GSM-7 character encoding? | Twilio](https://www.twilio.com/docs/glossary/what-is-gsm-7-character-encoding)
- [What is UCS-2 Character Encoding? | Twilio](https://www.twilio.com/docs/glossary/what-is-ucs-2-character-encoding)
