import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from '../../common/components/styledButton/StyledButton';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you're looking for it doesn't exist"
      extra={(
        <StyledButton type="primary" onClick={() => navigate('/')}>
          Back to home
        </StyledButton>
      )}
    />
  );
};

export default NotFoundPage;
