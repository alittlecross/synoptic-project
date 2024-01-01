export const restrictedLogIn = async () => {
  await browser.url("/");
  const username = await $('input[name="username"]');
  await username.setValue("restricted@email.com");
  const password = await $('input[name="password"]');
  await password.setValue("password");
  const submit = await $('button[type="submit"]');
  await submit.click();
};

export const viewLogIn = async () => {
  await browser.url("/");
  const username = await $('input[name="username"]');
  await username.setValue("view@email.com");
  const password = await $('input[name="password"]');
  await password.setValue("password");
  const submit = await $('button[type="submit"]');
  await submit.click();
};

export const editLogIn = async () => {
  await browser.url("/");
  const username = await $('input[name="username"]');
  await username.setValue("edit@email.com");
  const password = await $('input[name="password"]');
  await password.setValue("password");
  const submit = await $('button[type="submit"]');
  await submit.click();
};

export const restrictedQuiz = async () => {
  await restrictedLogIn();
  const link = await $('a[href="/quiz-1"]');
  await link.click();
};

export const viewQuiz = async () => {
  await viewLogIn();
  const link = await $('a[href="/quiz-1"]');
  await link.click();
};

export const editQuiz = async () => {
  await editLogIn();
  const link = await $('a[href="/quiz-1"]');
  await link.click();
};

export const editEditId = async () => {
  await editLogIn();
  const quiz = await $("a=English");
  await quiz.click();
  const edit = await $('a[href^="/edit"]');
  await edit.click();
};

export const editAdd = async () => {
  await editLogIn();
  const quiz = await $('a[href="/add"]');
  await quiz.click();
};
