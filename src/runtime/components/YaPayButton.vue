<template>
  <div ref="mountPointRef">
    <!-- Yandex Pay button will be mounted here -->
  </div>
</template>

<script lang="ts">
import { useYaPay } from '#imports';
import { defineComponent, ref } from 'vue-demi';

export default defineComponent({
  name: 'YaPayButton',

  emits:[
    'payButtonClick',
    'formOpenError',
    'sessionCreateError',
  ],

  setup(props, { emit }) {
    const mountPointRef = ref();

    const YaPay = useYaPay();


     // Данные платежа
     const paymentData = {
        // Для отладки нужно явно указать `SANDBOX` окружение,
        // для продакшена параметр можно убрать или указать `PRODUCTION`
        env: YaPay.PaymentEnv.Sandbox,

        // Версия 4 указывает на тип оплаты сервисом Yandex Pay
        // Пользователь производит оплату на форме Yandex Pay,
        // и мерчанту возвращается только результат проведения оплаты
        version: 4,

        // Код валюты в которой будете принимать платежи
        currencyCode: YaPay.CurrencyCode.Rub,

        // Идентификатор продавца, который получают при регистрации в Яндекс Пэй
        merchantId: 'ololo',

        // Сумма к оплате
        // Сумма которая будет отображена на форме зависит от суммы переданной от бэкенда
        // Эта сумма влияет на отображение доступности Сплита
        totalAmount: '15980.00',

        // Доступные для использования методы оплаты
        // Доступные на форме способы оплаты также зависят от информации переданной от бэкенда
        // Данные передаваемые тут влияют на внешний вид кнопки или виджета
        availablePaymentMethods: ['CARD', 'SPLIT'],
    };

    // Обработчик на клик по кнопке
    // Функция должна возвращать промис которые резолвит ссылку на оплату полученную от бэкенда Yandex Pay
    // Подробнее про создание заказа: https://pay.yandex.ru/ru/docs/custom/backend/yandex-pay-api/order/merchant_v1_orders-post
    async function onPayButtonClick() {
        // Создание заказа...
        // и возврат URL на оплату вида 'https://pay.ya.ru/l/XXXXXX'

        emit('payButtonClick');
    }

    // Обработчик на ошибки при открытии формы оплаты
    function onFormOpenError(reason) {
      emit('formOpenError', reason);
    }

    // Создаем платежную сессию
    YaPay.createSession(paymentData, {
        onPayButtonClick: onPayButtonClick,
        onFormOpenError: onFormOpenError,
    })
      .then(function(paymentSession) {
          // Показываем кнопку Yandex Pay на странице.
          paymentSession.mountButton(mountPointRef.value, {
              type: YaPay.ButtonType.Pay,
              theme: YaPay.ButtonTheme.Black,
              width: YaPay.ButtonWidth.Auto,
          });
      })
      .catch(function(err) {
        emit('sessionCreateError', err);
      });

    return {
      mountPointRef,
    };
  },
});
</script>
