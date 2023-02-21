import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { credentialFetch } from "../../utils/credential_fetch";
import { HTTP_METHODS } from "../../utils/http_methods";
import { MeetingData } from "../../utils/interfaces";
import "./MainMeeting.css";

export function MainMeeting() {
  const { meetingId } = useParams();
  const [meeting, setMeeting] = useState<MeetingData>({
    id: "",
    chats: [],
    questions: [],
  });
  useEffect(() => {
    const fetchMeeting = async () => {
      const res = await credentialFetch(
        `${GET_ALL_MESSAGES}?meetingId=${meetingId}`,
        HTTP_METHODS.GET
      );
      if (res.status === 200) {
        const data: MeetingData = res.data;
        setMeeting(data);
      }
    };
  }, []);

  return (
    <>
      <div className="div">
        <div className="div-2">
          <div className="div-3">Durham University Online Q&A</div>
          <div className="div-4">
            <div className="builder-columns div-5">
              <div className="builder-column column">
                <div className="div-6">
                  <div className="div-7">Dark Mode</div>
                  <div className="div-8">
                    <picture>
                      <source
                        srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739"
                        type="image/webp"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739"
                        srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2F69e145354fce49ceb6a49ad610373739"
                        className="image"
                      />
                    </picture>
                    <div className="builder-image-sizer image-sizer"></div>
                  </div>
                </div>
              </div>
              <div className="builder-column column-2">
                <div className="div-9">
                  <div className="div-10">
                    <picture>
                      <source
                        srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97"
                        type="image/webp"
                      />
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97"
                        srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd041b3b975a24b9aa5f112109f3a1d97"
                        className="image"
                      />
                    </picture>
                    <div className="builder-image-sizer image-sizer"></div>
                  </div>
                  <div className="div-11">My Account</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="div-12">
          <div className="builder-columns div-13">
            <div className="builder-column column-3">
              <div className="div-14">
                <div className="div-15">
                  <div className="div-16">
                    <div className="div-17">Current</div>
                    <div className="div-18">Answered</div>
                  </div>
                  <div className="div-19">
                    <div className="div-20">Sort by:</div>
                    <div className="div-21">
                      <div className="div-22">Newest</div>
                      <div className="div-23">
                        <picture>
                          <source
                            srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7"
                            type="image/webp"
                          />
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7"
                            srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fd878d6fac1764ced940999da213766f7"
                            className="image"
                          />
                        </picture>
                        <div className="builder-image-sizer image-sizer-2"></div>
                      </div>
                    </div>
                  </div>
                  <div className="div-24">
                    <div className="div-25">
                      <div className="div-26">
                        <picture>
                          <source
                            srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b"
                            type="image/webp"
                          />
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b"
                            srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Ff3b0893e7a6644b3bc21f1a8d20ea71b"
                            className="image"
                          />
                        </picture>
                        <div className="builder-image-sizer image-sizer-3"></div>
                      </div>
                    </div>
                    <div className="lorem-ipsum-dolor-sit-amet-co">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Phasellus id pharetra eros, id luctus orci. et feugiat
                      diam blandit a.
                    </div>
                  </div>
                </div>
                <div className="div-27">
                  <div className="div-28">Enter Question Text</div>
                  <div className="div-29">Ask Question</div>
                </div>
              </div>
            </div>
            <div className="builder-column column-4">
              <div className="div-30">
                <div className="builder-columns div-31">
                  <div className="builder-column column-5">
                    <div className="div-32">
                      <div className="div-33">
                        <div className="div-34">
                          <iframe
                            width="1280"
                            height="730"
                            src="https://www.youtube.com/embed/hzNDAhLlWZ8"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                      <div className="div-35">Current Question:</div>
                    </div>
                  </div>
                  <div className="builder-column column-6">
                    <div className="div-36">
                      <div className="div-37">
                        <div className="div-38">
                          <div className="div-39">
                            <picture>
                              <source
                                srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc"
                                type="image/webp"
                              />
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc"
                                srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa959a53c971b40bc99d0bc71a21309fc"
                                className="image"
                              />
                            </picture>
                            <div className="builder-image-sizer image-sizer"></div>
                          </div>
                          <div className="div-40">13:45</div>
                        </div>
                        <div className="div-41">
                          <div className="div-42">
                            <div className="div-43">Username</div>
                            <div className="lorem-ipsum-dolor-sit-amet-co-2">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit.
                            </div>
                          </div>
                          <div className="div-44">
                            <div className="div-45">
                              <picture>
                                <source
                                  srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293?format=webp&width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293?format=webp&width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293?format=webp&width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293?format=webp&width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293?format=webp&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293?format=webp&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293?format=webp&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293"
                                  type="image/webp"
                                />
                                <img
                                  loading="lazy"
                                  src="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293"
                                  srcSet="https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293?width=100 100w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293?width=200 200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293?width=400 400w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293?width=800 800w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293?width=1200 1200w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293?width=1600 1600w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293?width=2000 2000w, https://cdn.builder.io/api/v1/image/assets%2FTEMP%2Fa3f8635baf8c41c3acf2742e37426293"
                                  className="image"
                                />
                              </picture>
                              <div className="builder-image-sizer image-sizer"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="div-46">
                        <div className="div-47">Enter Chat Message</div>
                        <div className="div-48">Post Message</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
