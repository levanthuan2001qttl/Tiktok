import classNames from 'classnames/bind';
import styles from './Upload.moudle.scss';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import { Select, Checkbox } from 'antd';
import { useRef, useState } from 'react';
import { videosService } from '~/services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Upload() {
    const [videoFile, setVideoFile] = useState('');
    const [description, setDescription] = useState('');
    const [viewable, setViewable] = useState('public');
    const [allows, setAllows] = useState(true);

    const navigate = useNavigate();

    const handleChangeSelected = (target) => {
        setViewable(target.value);
    };

    const handleChangeChecked = (e) => {
        setAllows(e.target.checked);
    };

    const videoInputFile = useRef();
    const onEditBackgroundButtonClick = () => {
        videoInputFile?.current?.click();
    };

    const onChangeVideoFile = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event?.target?.files?.item(0);

        setVideoFile(file);
    };

    const handleSubmitUploadVideo = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('description', description);
        formData.append('thumbnail_time', 5);
        formData.append('viewable', viewable);
        formData.append('allows[]', 'comment');
        formData.append('upload_file', videoFile);

        const response = videosService.createVideo(formData);
        if (response.message) {
            toast.error(response.message);
        } else {
            toast.success('Video successfully uploaded');
            navigate('/');
        }
    };

    const handleChangeInput = (e) => {
        setDescription(e.target.value);
    };

    return (
        <div className={cx('wrapper')}>
            <PopperWrapper>
                <div className={cx('container')}>
                    <div>
                        <span className={cx('upload-title')}>T???i video l??n</span>
                    </div>
                    <div>
                        <span className={cx('upload-sub-title')}>????ng video v??o t??i kho???n c???a b???n</span>
                    </div>
                    <div className={cx('upload-container')}>
                        <div className={cx('uploader')}>
                            <img
                                src="https://lf16-tiktok-common.ttwstatic.com/obj/tiktok-web-common-sg/ies/creator_center/svgs/cloud-icon1.ecf0bf2b.svg"
                                className={cx('upload-icon')}
                                alt=""
                            />
                            <p className={cx('uploader-title')}>Ch???n video ????? t???i l??n</p>
                            <p className={cx('uploader-sub-title')}>Ho???c k??o v?? th??? t???p tin</p>

                            <div className={cx('text-video-info')}>
                                <div className="jsx-2404389384">
                                    <span className={cx('text-video-info-title')}>MP4 ho???c WebM</span>
                                </div>
                                <div className="jsx-2404389384">
                                    <span className={cx('text-video-info-title')}>????? ph??n gi???i 720x1280 tr??? l??n</span>
                                </div>
                                <div className="jsx-2404389384">
                                    <span className={cx('text-video-info-title')}>T???i ??a 10 ph??t</span>
                                </div>
                                <div className="jsx-2404389384">
                                    <span className={cx('text-video-info-title')}>Nh??? h??n 2 GB</span>
                                </div>
                            </div>
                            <div className={cx('file-select-btn')}>
                                <Button primary onClick={onEditBackgroundButtonClick} className={cx('upload-text')}>
                                    Ch???n t???p tin
                                    <input
                                        type="file"
                                        id="file"
                                        ref={videoInputFile}
                                        accept="video/mp4,video/x-m4v,video/*"
                                        onChange={onChangeVideoFile}
                                        style={{ display: 'none' }}
                                    />
                                </Button>
                            </div>
                        </div>

                        <form className={cx('upload-form')} onSubmit={handleSubmitUploadVideo}>
                            <div className={cx('upload-caption')}>
                                <label>Ch?? th??ch</label>
                                <input
                                    placeholder="Enter your caption"
                                    onChange={handleChangeInput}
                                    value={description}
                                />
                            </div>
                            {/* <div className={cx('upload-cover-image')}>
                                <label>???nh b??a</label>
                                <input />
                            </div> */}
                            <div className={cx('upload-regime')}>
                                <label>Ai c?? th??? xem video n??y</label>
                                <Select
                                    labelInValue
                                    defaultValue={{ key: 'public', label: 'C??ng khai' }}
                                    style={{ width: 120 }}
                                    onChange={handleChangeSelected}
                                >
                                    <Select.Option key="public">C??ng khai</Select.Option>
                                    <Select.Option key="friends">B???n b??</Select.Option>
                                    <Select.Option key="private">Ri??ng t??</Select.Option>
                                </Select>
                            </div>
                            {/* <video width="400" controls>
                                <source src={videoFile && URL.createObjectURL(videoFile)} />
                            </video> */}
                            <div className={cx('upload-regime')}>
                                <label>Cho ph??p ng?????i d??ng:</label>
                                <Checkbox onChange={handleChangeChecked}>B??nh lu???n</Checkbox>
                            </div>
                            <div className="d-flex justify-space-evenly">
                                <Button primary>????ng</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </PopperWrapper>
        </div>
    );
}

export default Upload;
