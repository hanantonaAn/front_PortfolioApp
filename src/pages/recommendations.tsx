import PageLayout from "@/components/layout/pageLayout";
import { ReactElement } from "react";
import HeadLayout from "@/components/layout/headLayout";
import { Typography } from "@material-tailwind/react";
import { AuthWrapper } from "@/components/layout/authWrapper";

const recommendations = () => {
    return (
        <AuthWrapper>
            <PageLayout>
                <div className="bg-gray-100 min-h-screen">
                    <section className="py-20 bg-gray-100">
                        <div className="container mx-auto px-6">
                            <h2 className="text-3xl lg:text-5xl font-bold text-gray-800 mb-8">Что такое портфолио и как его правильно заполнить</h2>
                            <Typography className="mb-2" variant="lead">Портфолио нужно дизайнерам, копирайтерам, программистам, маркетологам.</Typography>
                            <Typography className="mb-2" variant="lead">Портфолио — инструмент саморекламы. Оно способно выделить вас среди сотни кандидатов или, наоборот, оттолкнуть потенциального работодателя или заказчика. Рассказываем, каким специалистам нужно портфолио и как его составить, чтобы вас заметили.</Typography>
                            <Typography className="mb-2" variant="h2">Что такое портфолио и зачем оно нужно</Typography>
                            <Typography className="mb-2" variant="lead">Портфолио — это комплект наглядных образцов и кейсов, которые кандидат собрал за время работы. Его содержание зависит от специальности: фотографы собирают лучшие фотографии, копирайтеры — тексты, дизайнеры — логотипы и макеты сайтов.</Typography>
                            <Typography className="mb-2" variant="lead">Главная задача портфолио — показать реальные навыки, наработанный опыт и квалификацию кандидата.</Typography>
                            <Typography className="mb-2" variant="h3">Чем портфолио отличается от резюме</Typography>
                            <Typography className="mb-2" variant="lead">Резюме — это краткая профессиональная биография кандидата. Здесь пишут информацию об образовании, предыдущих местах работы, основных навыках, знаниях и умениях. Помимо профессиональных компетенций в резюме указывают личные качества: например, стрессоустойчивость, коммуникабельность, умение работать в команде.</Typography>
                            <Typography className="mb-2" variant="lead">Портфолио дополняет резюме и наглядно доказывает, что умеет специалист. Его ценность в том, что оно нарабатывается годами: нельзя сесть и за один вечер сделать портфолио. Это реальные документы и файлы. Понадобится несколько лет, чтобы разработать проекты, которые докажут профессионализм и знания.</Typography>
                            <Typography className="mb-2" variant="lead">Портфолио помогает рекрутеру оценить до какого уровня «дорос» кандидат на предыдущих местах работы. А кандидату — усилить резюме и повысить шанс получить оффер от работодателя.</Typography>
                            <Typography className="mb-2" variant="lead">На курсе Skypro «Графический дизайнер» можно собрать сильное портфолио еще в процессе обучения. В ходе курсовых работ вы сделаете дизайн email-рассылки, создадите презентации продуктов, разработаете дизайн лендинга. Будете искать работу — сможете продемонстрировать не только уверенные знания основных инструментов дизайнера, но и свои работы.</Typography>
                            <Typography className="mb-2" variant="h3">Кому может понадобиться портфолио</Typography>
                            <Typography className="mb-2" variant="lead">Вот сферы, в которых без портфолио — никак:</Typography>
                            <Typography className="mb-2" variant="lead">🎨Дизайн и графика. Кандидаты могут добавлять в портфолио скетчи, дизайн веб-интерфейсов, проекты ландшафтного дизайна, макеты, иллюстрации, баннеры.</Typography>
                            <Typography className="mb-2" variant="lead">💻Разработка. Для портфолио подойдут трехмерные модели, части кода, готовые программы, приложения, математические модели, алгоритмы.</Typography>
                            <Typography className="mb-2" variant="lead">📝Контент. В портфолио могут попасть статьи, обзоры, гайды, мануалы, инструкции, книги. Если контент визуальный — видеоролики, моушн, иллюстрации, схемы, инфографика.</Typography>
                            <Typography className="mb-2" variant="lead">📚Образование. В этой сфере успех преподавателя — успех его учеников. Например, если репетитор английского языка готовит учеников к сдаче тестов IELTS или TOEFL, кейсами будут сертификаты учеников с высокими баллами.</Typography>
                            <Typography className="mb-2" variant="lead">🎥Креативные специальности. Это фотографы, стилисты, визажисты, видеографы. В их портфолио будут фото и видео с работами.</Typography>
                            <Typography className="mb-2" variant="h3">Как правильно составить портфолио</Typography>
                            <Typography className="mb-2" variant="lead">Грамотно составленное портфолио заинтересует работодателя. С его помощью он поймет, насколько вы отвечаете требованиям компании и какую пользу можете принести. Не стоит воспринимать портфолио как простое хранилище примеров работ — его важно структурировать, дополнить контактами и СТА.</Typography>
                            <Typography className="mb-2" variant="h4">Титульный лист</Typography>
                            <Typography className="mb-2" variant="lead">Это первая страница, которую смотрит работодатель, поэтому здесь нужно указать:</Typography>
                            <Typography className="mb-2" variant="lead">фамилию, имя, отчество;</Typography>
                            <Typography className="mb-2" variant="lead">специальность;</Typography>
                            <Typography className="mb-2" variant="lead">телефон, социальные сети и другие контакты;</Typography>
                            <Typography className="mb-2" variant="lead">небольшое приветствие.</Typography>
                            <Typography className="mb-2" variant="lead">Приветствие должно быть коротким: чем меньше в нем постороннего текста, тем больше работодатель сосредоточен на кейсах.</Typography>
                            <Typography className="mb-2" variant="h4">Информация о себе</Typography>
                            <Typography className="mb-2" variant="lead">Для информации о себе выделите отдельную страницу. Кратко перечислите профессиональные достижения, с какими проектами работали, что удается лучше всего. Если есть ссылка на блог, интервью или подкаст, можно оставить ее в конце текста. Работодатель ознакомится с материалом, если захочет узнать кандидата лучше.</Typography>
                            <Typography className="mb-2" variant="h4">Подробности кейсов</Typography>
                            <Typography className="mb-2" variant="lead">В кейсах надо использовать не только фотографии, графики, скриншоты, таблицы и прототипы, но и краткие описания. Например, как называется проект, кто заказчик, какова цель проекта, как проходил процесс работы, какие результаты получили.</Typography>
                            <Typography className="mb-2" variant="h4">Призыв к действию</Typography>
                            <Typography className="mb-2" variant="lead">Портфолио еще и продвигает ваши услуги. Поэтому в конце оформите призыв к действию. Например, можно предложить скидку, дать гарантию или бесплатную консультацию, если заказчик или работодатель оставит заявку.</Typography>
                            <Typography className="mb-2" variant="h4">Контакты для связи</Typography>
                            <Typography className="mb-2" variant="lead">В конце портфолио оставляют контакты:</Typography>
                            <Typography className="mb-2" variant="lead">телефонный номер;</Typography>
                            <Typography className="mb-2" variant="lead">ссылки на мессенджеры и социальные сети;</Typography>
                            <Typography className="mb-2" variant="lead">адрес электронной почты.</Typography>
                            <Typography className="mb-2" variant="lead">Кандидату не обязательно указывать все контакты: трех способов связи достаточно.</Typography>
                        </div>
                    </section>
                </div>
            </PageLayout>
        </AuthWrapper>
    );
}

recommendations.getLayout = function getLayout(page: ReactElement) {
    return (
        <HeadLayout title="Рекомендации" description="Рекомендации" keywords="Рекомендации">
            {page}
        </HeadLayout>
    )
}

export default recommendations;