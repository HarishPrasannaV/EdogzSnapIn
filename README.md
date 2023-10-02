# EdogzSnapIn
A Snap-In developed for DevRev platform by the team EDogs as a submission for DevRev 2023 AI Hackathon

# Introduction
- Our Snap-In aims to integrate DevRev with Twilio and OpenAI, to bridge the gap between CRM platform and Live voice customer engagement.
- Now Customer support agents assisted with OpenAI, can seamlessly track, manage and resolve issues that are raised through voice calls.
# Our Solution
- Our Snap-In uses Twilio, one of the largest and most widely used live customer engagement platforms, to handle incoming calls to a Dev Org.
- Once, Twilio receives a call, it presents the customer with the option to either leave a voice message or talk to a customer support agent.
- The call is recorded and transcribed into text.
- The transcription is then fed into OpenAI GPT-3.5 to generate, the title for the ticket, a summary of the conversation, CSAT(Customer Satisfaction) and Action items, Using this information a new ticket is created within DevRev.
- Also with the ticket, the URL for the audio of the recorded and the actual transcription is attached.
# Execution flow
Yellow -> The feature is yet to be implemented
Blue -> The feature has been successfully implemented
![](https://i.imgur.com/edEGXb2.png)
# Code Repository Link
https://github.com/HarishPrasannaV/EdogzSnapIn.git
# Challenges
1. Since the feature to respond to an incoming webhook request is not yet available in DevRev, it would not be possible to provide Tiwlio with instructions on how to handle the call.(The issue is expected to be resolved in the future)
- Fortunately, this problem is overcome by using a feature called the Twilio function, this enables us to store javascript code on Twilio which will provide instructions on how to handle the call
- The downside however is that the user has to manually setup the Twilio function after installing the snap-in, which is quite cumbersome.
2. We tried to implement voice transcription with Wipser-1 of OpenAi, but it currently doesn't support audio streaming from a remote URL
- So, we have to settle for the transcription feature which is built in Twilio, the accuracy of the transcription is very poor but it sure does make for some funny ticket descriptions.
# Limitations
- Less than ideal setup process
- Poor audio transcription
- Long ticket generation time(45 Seconds)
# Key Features
- Automatic Ticket generation
- Call Transcription
- Call recording
- Ticket title, description, summary, CSAT and action items generation
# Future Improvements
1. Address the issues in Limitations
2. Live call handling within DevRev, Incoming and Outgoing.
3. Intelligent Ticket updates
4. SMS handling and customer notification
# Contact Details
1. Harish Prasanna V - 9443767624, ed21b027@smail.iitm.ac.in
2. Jeeva - 95001022029, ed21b030@smail.iitm.ac.in
3. Senthil - 7010975399, ed21b057@smail.iim.ac.in

# APIs Used
1. DevRev TypeScript SDK
2. OpenAI
3. Twilio


