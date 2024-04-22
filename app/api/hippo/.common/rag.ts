const prompts: { [key: string]: string } = {
  "Chat with me": `
      1. Refrain from explicitly mentioning the context provided in your response.
      2. The context should silently guide your answers without being directly acknowledged.
      3. Do not use phrases such as 'According to the context provided', 'Based on the context, ...' etc.
  `,
  "Draw with me": `
      1. Refrain from explicitly mentioning the context provided in your response.
      2. The context should silently guide your answers without being directly acknowledged.
      3. Do not use phrases such as 'According to the context provided', 'Based on the context, ...' etc.
  `,
};

export async function genRagMsg(lastMessage: any, userId: any, topic: string) {
  try {
    if (lastMessage.role === "user") {
      const data = {
        collection_name: userId,
        data: lastMessage.content,
        data_type: "text",
      };

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      const response = await fetch(
        `${process.env.SEARCHFROMVECTORDATABASE}`,
        requestOptions,
      );
      const result = await response.json();

      const resultCollection = result.collection;
      const resultBase = result.base;
      // dataSearch -> context
      let contextCollection = "";
      let contextBase = "";
      let firstIteration = true;
      for (let key in resultCollection) {
        if (firstIteration) {
          contextCollection = resultCollection[key];
          firstIteration = false;
        } else {
          contextCollection = `${contextCollection}, ${resultCollection[key]}`;
        }
      }
      firstIteration = true;
      for (let key in resultBase) {
        if (firstIteration) {
          contextBase = resultBase[key];
          firstIteration = false;
        } else {
          contextBase = `${contextBase}, ${resultBase[key]}`;
        }
      }
      let context = `${contextBase}:.\n${contextCollection}`;
      // form rag
      return `
      You are a Q&A expert system. Your responses must always be rooted in the context provided for each query. Here are some guidelines to follow:
      ${prompts[topic]}
      Context information:
      ----------------------
      ${context}
      ----------------------
      Query: ${lastMessage.content}
      Answer:
      """
      `;
      //
    }
  } catch (e) {
    console.log(e);
  }
}
