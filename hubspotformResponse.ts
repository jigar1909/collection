export const hbFormResponse = {
  "portalId": 22207066,
  "form": {
    "id": "68eca543-afc8-43fc-8956-f2411bb6aa9c",
    "type": 0,
    "modules": [
      {
        "type": "step",
        "id": 2545922418712,
        "modules": [
          {
            "type": "row",
            "id": 2356512724636,
            "modules": [
              {
                "type": "radioSelect",
                "id": 2659656317993,
                "label": "How would you best describe your organization?",
                "required": true,
                "propertyReference": "0-2/organization_type",
                "conditionallyHidden": false,
                "triggerDependentRulesOnLoad": false,
                "description": "Select any one to ensure we tailor Pulse to fit your needs",
                "options": [
                  {
                    "label": "We are a Brand",
                    "value": "We are a Brand",
                    "selected": false
                  },
                  {
                    "label": "We are an Agency",
                    "value": "We are an Agency",
                    "selected": false
                  }
                ]
              }
            ]
          },
          {
            "type": "row",
            "id": 2733306787759,
            "modules": [
              {
                "type": "multipleCheckbox",
                "id": 2059844994760,
                "label": "Which areas do you want to improve and grow using data insights?",
                "required": true,
                "propertyReference": "0-2/onboarding_function_type",
                "conditionallyHidden": false,
                "triggerDependentRulesOnLoad": false,
                "description": "Pulse delivers a single source of truth for the entire business. You can start with any function and expand later",
                "options": [
                  {
                    "label": "Marketing",
                    "value": "Marketing",
                    "selected": false
                  },
                  {
                    "label": "Sales",
                    "value": "Sales",
                    "selected": false
                  },
                  {
                    "label": "Finance",
                    "value": "Finance",
                    "selected": false
                  },
                  {
                    "label": "Operations",
                    "value": "Operations",
                    "selected": false
                  },
                  {
                    "label": "Product",
                    "value": "Product",
                    "selected": false
                  },
                  {
                    "label": "Customer",
                    "value": "Customer",
                    "selected": false
                  }
                ]
              }
            ]
          },
          {
            "type": "navigationRow",
            "id": 3268290314808,
            "modules": [
              {
                "type": "nextButton",
                "id": 2840979752517,
                "text": "Next"
              }
            ]
          }
        ]
      },
      {
        "type": "step",
        "id": 2615920460734,
        "modules": [
          {
            "type": "row",
            "id": 2600991341729,
            "modules": [
              {
                "type": "text",
                "label": "Enter your brand name",
                "required": false,
                "propertyReference": "0-2/brand_name",
                "conditionallyHidden": false,
                "triggerDependentRulesOnLoad": false,
                "id": 3024178809605,
                "description": "If you manage multiple brands, don&#039;t worry—you can add them later",
                "placeholder": "Brand Name"
              }
            ]
          },
          {
            "type": "navigationRow",
            "id": 1779216985160,
            "modules": [
              {
                "type": "previousButton",
                "id": 2573815713853,
                "text": "Previous "
              },
              {
                "type": "nextButton",
                "id": 3007514548329,
                "text": "                 Next"
              }
            ]
          }
        ]
      },
      {
        "type": "step",
        "id": 2428394780518,
        "modules": [
          {
            "type": "row",
            "id": 2391434351723,
            "modules": [
              {
                "type": "radioSelect",
                "id": 2656801108070,
                "label": "Select the model that best represent your brand",
                "required": false,
                "propertyReference": "0-2/brand_model",
                "conditionallyHidden": false,
                "triggerDependentRulesOnLoad": false,
                "description": "Your Pulse experience will be tailored based on your selections",
                "options": [
                  {
                    "label": "One-time Purchase (OTP)",
                    "value": "One-time Purchase (OTP)",
                    "selected": false
                  },
                  {
                    "label": "Subscription",
                    "value": "Subscription",
                    "selected": false
                  },
                  {
                    "label": "Both, Subscription and OTP",
                    "value": "Both, Subscription and OTP",
                    "selected": true
                  }
                ]
              }
            ]
          },
          {
            "type": "row",
            "id": 2938487761908,
            "modules": [
              {
                "type": "multipleCheckbox",
                "id": 2326038098612,
                "label": "Select your primary selling channels",
                "required": false,
                "propertyReference": "0-2/select_your_selling_channels",
                "conditionallyHidden": false,
                "triggerDependentRulesOnLoad": false,
                "description": "Select the channels where you sell most often so we can tailor insights across your key platforms",
                "options": [
                  {
                    "label": "Marketplace",
                    "value": "Marketplace",
                    "selected": false
                  },
                  {
                    "label": "DTC",
                    "value": "DTC",
                    "selected": false
                  },
                  {
                    "label": "Retail",
                    "value": "Retail",
                    "selected": false
                  }
                ]
              }
            ]
          },
          {
            "type": "navigationRow",
            "id": 2392876686458,
            "modules": [
              {
                "type": "previousButton",
                "id": 2740284700666,
                "text": "  Previous"
              },
              {
                "type": "nextButton",
                "id": 2497986509565,
                "text": "Next"
              }
            ]
          }
        ]
      },
      {
        "type": "step",
        "id": 3201910948903,
        "modules": [
          {
            "type": "row",
            "id": 3337410373064,
            "modules": [
              {
                "type": "multipleCheckbox",
                "id": 3328091950480,
                "label": "Select the features that best align with your interests",
                "required": false,
                "propertyReference": "0-2/features_interests",
                "conditionallyHidden": false,
                "triggerDependentRulesOnLoad": false,
                "description": "Based on your selected features and preferences, we&#039;ll recommend the most relevant dashboards to support your goals",
                "options": [
                  {
                    "label": "Sales",
                    "value": "Sales",
                    "selected": false
                  },
                  {
                    "label": "Marketing",
                    "value": "Marketing",
                    "selected": false
                  },
                  {
                    "label": "Customers",
                    "value": "Customers",
                    "selected": false
                  },
                  {
                    "label": "Attribution",
                    "value": "Attribution",
                    "selected": false
                  },
                  {
                    "label": "Finance",
                    "value": "Finance",
                    "selected": false
                  },
                  {
                    "label": "Product",
                    "value": "Product",
                    "selected": false
                  }
                ]
              }
            ]
          },
          {
            "type": "row",
            "id": 3342904208584,
            "modules": [
              {
                "type": "heading",
                "id": 2329163445905,
                "text": "[ 'Optimize marketing campaigns for better ROI', 'Compare marketing performance across all channels', 'Measure customer acquisition cost by campaign and channel' ],[ 'Optimize marketing campaigns for better ROI', 'Compare marketing performance across all channels', 'Measure customer acquisition cost by campaign and channel' ],[ 'Optimize marketing campaigns for better ROI', 'Compare marketing performance across all channels', 'Measure customer acquisition cost by campaign and channel' ], [ 'Optimize marketing campaigns for better ROI', 'Compare marketing performance across all channels', 'Measure customer acquisition cost by campaign and channel' ], [ 'Optimize marketing campaigns for better ROI', 'Compare marketing performance across all channels', 'Measure customer acquisition cost by campaign and channel' ], [ 'Optimize marketing campaigns for better ROI', 'Compare marketing performance across all channels', 'Measure customer acquisition cost by campaign and channel' ]",
                "level": 6
              }
            ]
          },
          {
            "type": "navigationRow",
            "id": 2878515653123,
            "modules": [
              {
                "type": "previousButton",
                "id": 1893370231509,
                "text": "Previous"
              },
              {
                "type": "submitButton",
                "id": 8,
                "text": "Submit"
              }
            ]
          }
        ]
      }
    ],
    "logicRules": {},
    "lastUpdatedAt": 1734331997908
  },
  "postSubmit": {
    "modules": [
      {
        "type": "step",
        "id": 2781,
        "modules": [
          {
            "type": "row",
            "id": 2780,
            "modules": [
              {
                "type": "richText",
                "id": 9,
                "html": "<p style=\"font-size: 30px; line-height: 125%;\"><strong>Form submitted<br></strong></p>\n<p style=\"font-size: 16px; line-height: 125%;\">&nbsp;</p>\n<p style=\"font-size: 16px; line-height: 125%;\">&nbsp;</p>"
              }
            ]
          }
        ]
      }
    ]
  },
  "settings": {
    "enabledLiveValidation": true,
    "locale": "EN",
    "shortenForm": false
  },
  "style": {
    "richText": {
      "fontFamily": "Helvetica",
      "fontSize": "1.0em",
      "color": "rgba(4,57,80,1.0)"
    },
    "inputField": {
      "description": {
        "color": "rgba(81,99,131,0.89)",
        "fontFamily": "Helvetica"
      },
      "error": {
        "color": "rgba(229,21,32,1.0)",
        "fontFamily": "Helvetica"
      },
      "input": {
        "fontFamily": "helvetica",
        "backgroundColor": "rgba(245,248,250,1.0)",
        "borderColor": "rgba(3,93,106,1.0)",
        "borderTopLeftRadius": "3.0px",
        "borderTopRightRadius": "3.0px",
        "borderBottomRightRadius": "3.0px",
        "borderBottomLeftRadius": "3.0px",
        "borderStyle": "solid",
        "borderTopWidth": "1.0px",
        "borderBottomWidth": "1.0px",
        "borderLeftWidth": "1.0px",
        "borderRightWidth": "1.0px",
        "paddingTop": "12.0px",
        "paddingBottom": "12.0px",
        "paddingLeft": "10.0px",
        "paddingRight": "10.0px"
      },
      "label": {
        "color": "rgba(37,51,66,1.0)",
        "fontFamily": "Helvetica",
        "fontSize": "1.0em"
      },
      "placeholder": {
        "color": "rgba(81,99,131,0.64)",
        "fontFamily": "Helvetica"
      }
    },
    "button": {
      "backgroundColor": "rgba(44,62,99,1.0)",
      "boxShadow": "0.0px 2.0px 1.0px 0.0px rgba(5,43,74,1.0)",
      "color": "rgba(255,255,255,1.0)",
      "fontFamily": "helvetica",
      "fontSize": "1.0em",
      "borderTopLeftRadius": "6.0px",
      "borderTopRightRadius": "6.0px",
      "borderBottomRightRadius": "6.0px",
      "borderBottomLeftRadius": "6.0px",
      "paddingTop": "12.0px",
      "paddingBottom": "12.0px",
      "paddingLeft": "36.0px",
      "paddingRight": "36.0px"
    },
    "background": {
      "borderColor": "rgba(255,255,255,1.0)",
      "borderStyle": "none",
      "borderBottomWidth": "1.0px",
      "borderTopWidth": "1.0px",
      "borderLeftWidth": "1.0px",
      "borderRightWidth": "1.0px",
      "borderTopLeftRadius": "0.0px",
      "borderTopRightRadius": "0.0px",
      "borderBottomRightRadius": "0.0px",
      "borderBottomLeftRadius": "0.0px"
    },
    "heading": {
      "fontFamily": "Helvetica",
      "color": "rgba(4,57,80,1.0)"
    },
    "progressBar": {
      "text": {
        "fontFamily": "Helvetica",
        "color": "rgba(37,51,66,1.0)",
        "fontSize": "1.0em"
      },
      "progressLine": {
        "backgroundColor": "rgba(44,62,99,1.0)"
      },
      "trackLine": {
        "backgroundColor": "rgba(217,217,217,1.0)"
      }
    }
  },
  "translations": {
    "FIELD_ERROR_REQUIRED_FIELD": "Please complete this required field.",
    "FIELD_ERROR_PHONE_INVALID_CHARACTERS": "Must start with an extension and contain only numbers, +()-. and x.",
    "FIELD_ERROR_INPUT_TOO_LARGE": "Please use fewer than 65536 characters.",
    "FIELD_ERROR_INVALID_EMAIL_FORMAT": "Email must be formatted correctly.",
    "FIELD_ERROR_FILE_TOO_LARGE": "Selected file is too large. Maximum allowed size is 100MB.",
    "FIELD_ERROR_INVALID_DATE": "Please enter a valid date.",
    "FIELD_ERROR_INVALID_NUMBER": "Please enter a valid number.",
    "GLOBAL_ERROR_MISSING_REQUIRED_FIELDS": "Please complete all required fields.",
    "GLOBAL_ERROR_BLOCKED_EMAIL": "Please change your email address to continue.",
    "GLOBAL_ERROR_TOO_MANY_REQUESTS": "There was an issue submitting your form. Please wait a few seconds and try again.",
    "GLOBAL_ERROR_FIELD_ERRORS": "The form could not be submitted because some fields contain errors.",
    "NUMBER_DECIMAL_INFO": "Note: using a comma, full stop or period will give you a decimal.",
    "EMAIL_RESUBSCRIBE_REQUIRED": "Looks like you've opted out of email communication. Click here to get an email and opt back in.",
    "EMAIL_SUGGESTION": "Did you mean {{suggestion}}?",
    "FILE_LABEL_SINGLE_DROP": "Drop a file here to upload",
    "FILE_LABEL_MULTIPLE_DROP": "Drop files here to upload",
    "FILE_SUBTITLE_BROWSE": "Or, click to browse",
    "FILE_LABEL_UPLOADING": "Uploading",
    "FILE_LABEL_UPLOAD_COMPLETE": "Upload complete",
    "FILE_LABEL_UPLOAD_FAILED": "Upload failed",
    "FILE_SUBTITLE_SEC_REMAINING": "{{seconds}} seconds remaining",
    "FILE_SUBTITLE_REMOVE_FILE": "Remove",
    "FILE_SUBTITLE_RETRY_FILE": "Retry or start again"
  }
};