export const sendRegisterMsgToTelegram = async (data) => {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const text = `Пользователь: ${data?.displayName} (${data?.email}), зарегистрировался в приложении.
  Свяжитесь с ним или подтвердите пользователя.
  Телефон: ${data?.phoneNumber}
  `;

  await fetch(
    `https://api.telegram.org/bot5191732071:AAEdoMzuDn_Ak685UpKG8of2Ly3NLo6ZQOk/sendMessage?chat_id=662457451&text=${text}`,
    requestOptions
  );
};
