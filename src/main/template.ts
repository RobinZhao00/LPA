export const job = (context = document) => {
  if (!context.title.includes('2024年上海人才招聘信息')) {
    return [];
  }
  const cardList = Array.from(
    context.querySelectorAll('.job-list-box .job-card-wrapper'),
  );
  return cardList.map((cardItem: any) => {
    const jobName = cardItem?.querySelector('.job-name')?.innerText;
    const [cityName, areaDistrict, businessDistrict] =
      cardItem.querySelector('.job-area')?.innerText.split('·') || [];
    const salaryDesc = cardItem.querySelector('.salary')?.innerText;
    const [jobExperience, jobDegree] = Array.from(
      cardItem.querySelectorAll('.tag-list li'),
    ).map((item: any) => item.innerText);

    const skills = Array.from(
      cardItem.querySelectorAll('.job-card-footer .tag-list li'),
    ).map((itm: any) => itm?.innerText);

    const welfareList =
      cardItem
        .querySelector('.job-card-footer .info-desc')
        ?.innerText?.split('，') || [];

    const companyBlock = cardItem.querySelector('.job-card-right');
    const brandLogo = companyBlock.querySelector('.company-logo a')?.src;
    const brandName = companyBlock.querySelector('.company-name a')?.innerText;
    const [brandIndustry, brandStageName, brandScaleName] = [
      ...companyBlock.querySelectorAll('.company-tag-list li'),
    ].map((itm) => itm?.innerText);

    const bossTitle = cardItem.querySelector(
      '.job-info .info-public em',
    )?.innerText;

    const bossName = cardItem
      .querySelector('.job-info .info-public')
      ?.innerHTML.replace(`<em>${bossTitle}</em>`, '');
    const bossOnline = cardItem.querySelector(
      '.job-info .boss-online-tag',
    )?.innerText;

    const jobDetailLink = cardItem.querySelector('.job-card-body >a').href;

    return {
      jobDesc: {
        jobName,
        salaryDesc,
        skills,
        welfareList,
        jobExperience,
        jobDegree,
        jobDetailLink,
      },
      geoInfo: {
        cityName,
        areaDistrict,
        businessDistrict,
      },
      company: {
        brandLogo,
        brandName,
        brandIndustry,
        brandStageName,
        brandScaleName,
      },
      hr: {
        bossName,
        bossTitle,
        bossOnline,
      },
      key: jobDetailLink,
    };
  });
};

export function jobDetail(context = document) {
  const rawData =
    context
      .querySelector('.job-sec-text')
      ?.innerHTML.replace(/\s|：/g, '')
      .split('<br>') || '';
  const idx = rawData.indexOf('职位要求');
  return {
    jd: rawData.slice(1, idx),
    need: rawData.slice(idx + 1, rawData.length),
  };
}
