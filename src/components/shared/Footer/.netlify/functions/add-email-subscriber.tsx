import axios from "axios";
const handler = async (event, context) => {
  const listId = process.env.REACT_APP_MAILCHIMPLISTID;
  const apikey = process.env.REACT_APP_MAILCHIMPAPIKEY;
  const body = JSON.parse(event.body);
  const { email_address, merge_fields } = body;
  if (!email_address) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Please provide an email address." }),
    };
  }

  try {
    const payload = {
      email_address,
      merge_fields,
      status: "subscribed",
    };

    const { data } = await axios.post(
      `https://us21.api.mailchimp.com/3.0/lists/${listId}/members`,
      payload,
      {
        headers: {
          Authorization: `Basic ${apikey}`,
        },
      }
    );
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

export { handler };
