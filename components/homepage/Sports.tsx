import React from 'react'
import Image from 'next/image'

function Sports() {
    const Sports = [
        {
            title: 'जुम्ला–रारा म्याराथन , ५ सय ९१ धावक सहभागी हुँदै',
            description: 'शनिबार सदरमुकाम खलङ्गा बजारमा आयोजना हुने जुम्ला–रारा अल्ट्रा म्याराथन ५ सय ११ जना धावक सहभागी हुने भएका छन्।',
            imageUrl: '/images/kasinHomepage/SportsImage2.jpeg',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २७, २०८२'
        },
        {
            title: 'खेल रद्द भएर नेपाल विश्वकपबाट वञ्चित भएपछि समर्थकहरू आक्रोशित',
            description: 'लिभरपुलले इंग्लिस प्रिमियर लिगको उपाधि जितेको छ। टोटेनहम हट्सपरलाई आइतबार ४-२ ले पराजित गरेसँगै लिभरपुलले उपाधि हात पारेको हो।',
            imageUrl: '/images/kasinHomepage/SportsImage3.png',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २७, २०८२'
        },
        {
            title: 'इंग्लिस प्रिमियर लिग आर्सनलको कमजोर प्रदर्शन बन्यो लिभरपुललाई उपाधि चुम्ने अवसर',
            description: 'आईसीसी यू-१९ विश्वकप एसिया छनोट अन्तर्गत नेपाल र अफगानिस्तानबीचको खेल रद्द भएपछि नेपाल विश्वकपबाट बाहिरिएको छ।',
            imageUrl: '/images/kasinHomepage/SportsImage4.png',
            author: 'प्रकाश थापा',
            publishedDate: 'बैशाख २४, २०८२'
        },
    ]

    return (
        <div className="w-full px-4 lg:px-20 md:px-6 py-12">
            <div className="max-w-8xl mx-auto md:mx-16 lg:mx-24 flex flex-col gap-12">
                <div className="flex flex-col gap-2">
                    <p className="text-text-color font-orienta text-xl font-[700]">खेलकुद</p>
                    <div className="w-full h-[3px] bg-[#ebebeb]" />
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                    {/* COLUMN-1 */}
                    <div className="flex-1 flex flex-col gap-5 h-full justify-between">
                        <div>
                            <div className="w-full aspect-[3/2] bg-cover bg-center bg-no-repeat bg-[url(/images/kasinHomepage/SportsImage1.png)] rounded-xl" />
                            <p className="font-ibm_plex_serif font-bold text-2xl lg:text-4xl cursor-pointer text-text-color mt-4 hover:underline line-clamp-2">
                                आइसीसी यू-१९ विश्वकप एसिया छनोट अन्तर्गत नेपाल र अफगानिस्तानबीचको खेल रद्द
                            </p>
                            <p className="text-[#808080] font-ibm_plex_serif font-medium text-sm sm:text-base lg:text-lg mt-2">
                                नेपाली महिला क्रिकेट टोलीले शुक्रबार मलेसियामा टि ट्वान्टी विश्वकप २०२४ को छनोट खेलेको छ। छनोटको दोस्रो खेलमा घरेलु टोलीसँग प्रतिस्पर्धा गरेको छ।
                            </p>
                        </div>
                        <p className="text-[#808080] font-roboto text-xl flex items-center gap-2">
                            <span>प्रकाश थापा</span>
                            <span>·</span>
                            <span>बैशाख २५, २०८२</span>
                        </p>
                    </div>

                    {/* COLUMN-2 */}
                    <div className="flex-1 flex flex-col gap-6 justify-between">
                        {Sports.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-4 group items-start">
                                <div className="relative w-full sm:w-[40%] aspect-[4/3] overflow-hidden md:group-hover:translate-y-[-10px] md:transition md:duration-400 rounded-xl">
                                    <Image
                                        src={item.imageUrl}
                                        alt=""
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col gap-1 sm:w-[60%]">
                                    <p className="font-ibm_plex_serif font-semibold text-xl cursor-pointer text-text-color hover:underline line-clamp-1">
                                        {item.title}
                                    </p>
                                    <p className="text-[#808080] font-ibm_plex_serif font-medium text-lg line-clamp-2">
                                        {item.description}
                                    </p>
                                    <p className="text-[#808080] font-roboto text-xl mt-2 flex items-center gap-2">
                                        <span>{item.author}</span>
                                        <span>·</span>
                                        <span>{item.publishedDate}</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sports
