export const generateDataToSend = (pageId, data, content) => {
    switch (pageId) {
        case '1':
            return {
                'header': [
                    {
                        'title': data['header-title'],
                        'subtitle': data['header-subtitle'],
                    }
                ],
                'main': [
                    ...content.homeContent.main.map((section, index) => ({
                        'title': data[`main-${index}-title`] || section.title,
                        'subtitle': data[`main-${index}-subtitle`] || section.subtitle,
                        'text': section.text.map((text, i) => data[`main-${index}-text-${i}`] || text)
                    }))
                ],
                'footer': [
                    {
                        'text': [
                            data['footer-text-0'],
                            data['footer-text-1'],
                        ]
                    }
                ],
                'reviews': [
                    ...content.homeContent.reviews.map((review, index) => ({
                        'text': data[`review-${index}-text`] || review.text,
                        'author': data[`review-${index}-author`] || review.author,
                    })),
                    ...data['new-reviews'].map((newReview) => ({
                        'text': newReview.text,
                        'author': newReview.author,
                    }))
                ],
            }
        case '2':
            return {
                'header': [
                    {
                        'title': data['header-title'],
                        'subtitle': data['header-subtitle'],
                    }
                ],
                'main': [
                    {
                        'title': data['main-title'],
                        'text': [
                            data['text-0'],
                            data['text-1'],
                            data['text-2'],
                            data['text-3'],
                            data['text-4'],
                        ],
                    }
                ],
                'services': [
                    ...content.servicesContent.services.map((service, index) => ({
                        'title': data[`service-${index}-title`] || service.title,
                        'time': data[`service-${index}-time`] || service.time,
                        'text': data[`service-${index}-text`] || service.text,
                    }))
                ],
            }
        case '3':
            return {
                'header': [
                    {
                        'title': data['header-title'],
                    }
                ],
                'main': [
                    ...content.priceContent.main.map((section, index) => ({
                        'title': data[`main-${index}-title`] || section.title,
                        'duration': data[`main-${index}-duration`] || section.duration,
                        'price': data[`main-${index}-price`] || section.price,
                    }))
                ],
                'more': [
                    {
                        'title': data['more-0-title'],
                        'price': data['more-0-price'],
                    },
                    {
                        'text': data['more-1-text'],
                        'choices': [
                            data['choice-0'],
                            data['choice-1'],
                            data['choice-2'],
                        ],
                        'more': data['more-1-more'],
                    }
                ],
            }
        case '4':
            return {
                'main': [
                    {
                        'title': data['title'],
                        'text': [
                            data['text-0'],
                            data['text-1'],
                            data['text-2'],
                            data['text-3'],
                        ],
                    }
                ]
            }
        case '5':
            return {
                'header': [
                    {
                        'title': data['header-title'],
                    }
                ],
                'main': [
                    ...content.certificationContent.main.map((section, index) => ({
                        'title': data[`main-${index}-title`] || section.title,
                        'text': section.text.map((text, i) => data[`main-${index}-text-${i}`] || text)
                    }))
                ],
            }
        case '6':
            return {
                'header': [
                    {
                        'title': data['header-title'],
                        'name': data['header-name'],
                        'address': data['header-address'],
                        'zip': data['header-zip'],
                        'city': data['header-city'],
                        'phone': data['header-phone'],
                        'email': data['header-email'],
                    }
                ],
            }
        default:
            return null
    }
}