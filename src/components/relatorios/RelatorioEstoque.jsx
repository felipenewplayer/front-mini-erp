const iframeContainerStyle = {
  position: 'relative',
  paddingBottom: '60%', // proporção 16:9 ~ 56%, 60% fica legal pra dashboard
  height: 0,
  overflow: 'hidden',
};

const iframeStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 'none',
};

export default function EstoqueRelatorio() {
  return (
    <div style={iframeContainerStyle}>
      <iframe
        title="TesteNOPROJETO"
        src="https://app.powerbi.com/view?r=eyJrIjoiYmI0NDIxYmYtNjY4OS00NTI2LWJiNGQtNTEyODVhNDllNWIyIiwidCI6IjgxMGI4ZGQ3LTk0NTYtNDRlYy04YjA5LTVlY2Q4YmIzZTEyNyJ9&locale=pt-BR"
        allowFullScreen={true}
        style={iframeStyle}
      />
    </div>
  );
}
