import { useEffect, useState } from 'react';

const yodaSays = [
  'Не пробуй. Делай или не делай. Нет никаких попыток',
  'Сконцентрируйся и оставайся внимательным',
  'Хватит предсказывать последствия своих действий',
  'Перестань источать негатив',
  'Учитесь владеть своими импульсами',
  'Практикуйтесь, отпуская прошлое',
  'Терпение необходимо во всем, что вы делаете',
  'Да пребудет с тобой сила',
  'Вы найдете только то, что вы принесете',
  'Оставайся в трудном положении, когда должен',
  'Светящиеся существа — это мы… а не эта грубая материя',
  'Вы найдете хорошее в плохом, когда будете спокойны и пассивны',
  'Размер не имеет значения. Посмотрите на меня. Судите меня по размеру, не так ли?',
  'Поистине замечательным ум ребенка является',
  'Почувствуй силу!',
  'В темном месте мы находим себя, и лишь знания освещают наш путь',
  'Смерть — это естественная часть жизни. Радуйся за тех, кто вокруг тебя, кто превращается в Силу. Оплакивать их не надо. Скучать по ним не надо',
  'Приключение. Азарт. Джедай не жаждет этих вещей',
  'Многое узнать ты еще можешь, мой старый падаван. Это только начало',
  'Быть джедаем — значит смотреть правде в глаза и выбирать. Источай свет или тьму, падаван. Будь свечой или ночью',
  'Джедай использует Силу для знания и защиты, а не для атаки',
  'Контролируй, контролируй, ты должен научиться контролировать!',
  'Всегда делись тем, чему ты научился',
  'Всегда есть два, не больше, не меньше. Мастер и ученик',
  'Если вы не совершили ни единой ошибки, проигрываете вы. В другую игру вы должны играть',
  'Помните, что вы узнали. Сохранить вы это можете',
  'Часто самым большим камнем преткновения на пути к личному успеху является страх',
  'Как только вы пойдете по темному пути, он навек станет доминировать в вашей судьбе, поглотит вас',
  'Приучите себя отпускать все, что боитесь потерять',
  'Страх потери — это путь к Темной стороне',
  'Темная сторона омрачает все. Будущее в том, что невозможно увидеть будущее',
  'Должен быть назван твой страх перед тем, как прогнать его',
  'В конце концов, трусы — это те, кто следует Темной стороне',
  'Необходимо и достаточно — главные условия выбора',
  'Не каждый корабль вернётся в свою гавань, но каждый мечтает дойти',
  'Не каждый камень на который ты наступаешь чёрный или белый',
  'Прежде, чем получить ответ на вопрос — задай ответ… Больше вопросов не будет',
  'Бойся глупости — и от себя и от других',
];

const useYodaSays = (addAuthor = false) => {
  const [returnString, setReturnString] = useState<string | null>(null);

  useEffect(() => {
    setReturnString(
      `${addAuthor ? '«' : ''}${yodaSays[Math.floor(Math.random() * yodaSays.length)]}${addAuthor ? '» — Йода' : ''}`,
    );
  }, [addAuthor]);

  return returnString;
};

export default useYodaSays;