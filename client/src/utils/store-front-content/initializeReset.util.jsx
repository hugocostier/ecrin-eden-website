export const initializeReset = (content, pageId, reset) => {
    let header, main, footer, reviews, services, more

    switch (pageId) {
        case '1':
            header = {
                'title': content.homeContent.header[0].title,
                'subtitle': content.homeContent.header[0].subtitle,
            }

            main = content.homeContent.main.map((section) => {
                return {
                    'title': section.title,
                    'subtitle': section.subtitle,
                    'text': section.text,
                }
            })

            footer = {
                'text': content.homeContent.footer[0].text,
            }

            reviews = content.homeContent.reviews.map((review) => {
                return {
                    'text': review.text,
                    'author': review.author,
                }
            })

            reset({
                'header-title': header.title,
                'header-subtitle': header.subtitle,
                'main-0-title': main[0].title,
                'main-0-subtitle': main[0].subtitle,
                'main-0-text-0': main[0].text[0],
                'main-0-text-1': main[0].text[1],
                'main-0-text-2': main[0].text[2],
                'main-1-title': main[1].title,
                'main-1-text-0': main[1].text[0],
                'main-1-text-1': main[1].text[1],
                'footer-text-0': footer.text[0],
                'footer-text-1': footer.text[1],
                'review-0-text': reviews[0].text,
                'review-0-author': reviews[0].author,
                'review-1-text': reviews[1].text,
                'review-1-author': reviews[1].author,
                'review-2-text': reviews[2].text,
                'review-2-author': reviews[2].author,
            })

            break
        case '2':
            header = {
                'title': content.serviceContent.header[0].title,
                'subtitle': content.serviceContent.header[0].subtitle,
            }

            main = {
                'title': content.serviceContent.main[0].title,
                'text': content.serviceContent.main[0].text,
            }

            services = content.serviceContent.services.map((service) => {
                return {
                    'title': service.title,
                    'time': service.time,
                    'text': service.text,
                }
            })

            reset({
                'header-title': header.title,
                'header-subtitle': header.subtitle,
                'main-title': main.title,
                'text-0': main.text[0],
                'text-1': main.text[1],
                'text-2': main.text[2],
                'text-3': main.text[3],
                'text-4': main.text[4],
                'text-5': main.text[5],
                'service-0-title': services[0].title,
                'service-0-time': services[0].time,
                'service-0-text': services[0].text,
                'service-1-title': services[1].title,
                'service-1-time': services[1].time,
                'service-1-text': services[1].text,
                'service-2-title': services[2].title,
                'service-2-time': services[2].time,
                'service-2-text': services[2].text,
                'service-3-title': services[3].title,
                'service-3-time': services[3].time,
                'service-3-text': services[3].text,
                'service-4-title': services[4].title,
                'service-4-time': services[4].time,
                'service-4-text': services[4].text,
            })

            break
        case '3':
            header = {
                'title': content.priceContent.header[0].title,
            }

            main = content.priceContent.main.map((section) => {
                return {
                    'title': section.title,
                    'duration': section.duration,
                    'price': section.price,
                }
            })

            more = {
                'title': content.priceContent.more[0].title,
                'price': content.priceContent.more[0].price,
                'text': content.priceContent.more[1].text,
                'choices': content.priceContent.more[1].choices,
                'more': content.priceContent.more[1].more,
            }

            reset({
                'header-title': header.title,
                'main-0-title': main[0].title,
                'main-0-duration': main[0].duration,
                'main-0-price': main[0].price,
                'main-1-title': main[1].title,
                'main-1-duration': main[1].duration,
                'main-1-price': main[1].price,
                'main-2-title': main[2].title,
                'main-2-duration': main[2].duration,
                'main-2-price': main[2].price,
                'main-3-title': main[3].title,
                'main-3-duration': main[3].duration,
                'main-3-price': main[3].price,
                'main-4-title': main[4].title,
                'main-4-duration': main[4].duration,
                'main-4-price': main[4].price,
                'main-5-title': main[5].title,
                'main-5-duration': main[5].duration,
                'main-5-price': main[5].price,
                'more-0-title': more.title,
                'more-0-price': more.price,
                'more-1-text': more.text,
                'choice-0': more.choices[0],
                'choice-1': more.choices[1],
                'choice-2': more.choices[2],
                'more-1-more': more.more,
            })

            break
        case '4':
            main = {
                'title': content.giftCardContent.main[0].title,
                'text': content.giftCardContent.main[0].text,
            }

            reset({
                'title': main.title,
                'text-0': main.text[0],
                'text-1': main.text[1],
                'text-2': main.text[2],
                'text-3': main.text[3],
            })

            break
        case '5':
            header = {
                'title': content.certificationContent.header[0].title,
            }

            main = content.certificationContent.main.map((section) => {
                return {
                    'title': section.title,
                    'text': section.text,
                }
            })

            reset({
                'header-title': header.title,
                'main-0-title': main[0].title,
                'main-0-text-0': main[0].text[0],
                'main-0-text-1': main[0].text[1],
                'main-0-text-2': main[0].text[2],
                'main-0-text-3': main[0].text[3],
                'main-0-text-4': main[0].text[4],
                'main-1-title': main[1].title,
                'main-1-text-0': main[1].text[0],
                'main-1-text-1': main[1].text[1],
                'main-1-text-2': main[1].text[2],
                'main-1-text-3': main[1].text[3],
                'main-1-text-4': main[1].text[4],
            })

            break
        case '6':
            header = {
                'title': content.contactContent.header[0].title,
                'name': content.contactContent.header[0].name,
                'address': content.contactContent.header[0].address,
                'zip': content.contactContent.header[0].zip,
                'city': content.contactContent.header[0].city,
                'phone': content.contactContent.header[0].phone,
                'email': content.contactContent.header[0].email,
            }

            reset({
                'header-title': header.title,
                'header-name': header.name,
                'header-address': header.address,
                'header-zip': header.zip,
                'header-city': header.city,
                'header-phone': header.phone,
                'header-email': header.email,
            })

            break
        default:
            break
    }
}

// export const initializeReset = (content, pageId, reset) => {
//     const extractContent = (source, fields) => {
//         let result = {}
//         fields.forEach(field => {
//             result[field] = source[field]
//         })
//         console.log(result)
//         return result
//     }

//     const mapContent = (source, fields) => {
//         return source.map(item => extractContent(item, fields))
//     }

//     const formatMain = (main) => {
//         let formattedMain = {}
//         main.forEach((section, index) => {
//             formattedMain[`main-${index}-title`] = section.title
//             section.text.forEach((text, textIndex) => {
//                 formattedMain[`main-${index}-text-${textIndex}`] = text
//             })
//         })
//         return formattedMain
//     }

//     let resetData = {}
//     let headerFields, mainFields, footerFields, reviewFields, serviceFields, moreFields, contactFields

//     switch (pageId) {
//         case '1':
//             headerFields = ['title', 'subtitle']
//             mainFields = ['title', 'subtitle', 'text']
//             footerFields = ['text']
//             reviewFields = ['text', 'author']

//             resetData = {
//                 ...extractContent(content.homeContent.header[0], headerFields),
//                 ...formatMain(mapContent(content.homeContent.main, mainFields)),
//                 ...extractContent(content.homeContent.footer[0], footerFields),
//                 ...mapContent(content.homeContent.reviews, reviewFields).reduce((acc, review, index) => {
//                     acc[`review-${index}-text`] = review.text
//                     acc[`review-${index}-author`] = review.author
//                     return acc
//                 }, {})
//             }
//             break

//         case '2':
//             headerFields = ['title', 'subtitle']
//             mainFields = ['title', 'text']
//             serviceFields = ['title', 'time', 'text']

//             resetData = {
//                 ...extractContent(content.serviceContent.header[0], headerFields),
//                 ...extractContent(content.serviceContent.main[0], mainFields),
//                 ...mapContent(content.serviceContent.services, serviceFields).reduce((acc, service, index) => {
//                     acc[`service-${index}-title`] = service.title
//                     acc[`service-${index}-time`] = service.time
//                     acc[`service-${index}-text`] = service.text
//                     return acc
//                 }, {})
//             }
//             break

//         case '3':
//             headerFields = ['title']
//             mainFields = ['title', 'duration', 'price']
//             moreFields = ['title', 'price', 'text', 'choices', 'more']

//             resetData = {
//                 ...extractContent(content.priceContent.header[0], headerFields),
//                 ...mapContent(content.priceContent.main, mainFields).reduce((acc, section, index) => {
//                     acc[`main-${index}-title`] = section.title
//                     acc[`main-${index}-duration`] = section.duration
//                     acc[`main-${index}-price`] = section.price
//                     return acc
//                 }, {}),
//                 ...extractContent(content.priceContent.more[0], moreFields)
//             }
//             break

//         case '4':
//             mainFields = ['title', 'text']

//             resetData = {
//                 ...extractContent(content.giftCardContent.main[0], mainFields)
//             }
//             break

//         case '5':
//             headerFields = ['title']
//             mainFields = ['title', 'text']

//             resetData = {
//                 ...extractContent(content.certificationContent.header[0], headerFields),
//                 ...formatMain(mapContent(content.certificationContent.main, mainFields))
//             }
//             break

//         case '6':
//             contactFields = ['title', 'name', 'address', 'zip', 'city', 'phone', 'email']

//             resetData = {
//                 ...extractContent(content.contactContent.header[0], contactFields)
//             }
//             break

//         default:
//             break
//     }

//     reset(resetData)
// }