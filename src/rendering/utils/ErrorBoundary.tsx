import React from "react";

export type ErrorBoundaryProps = {
    fallback: React.ReactNode;
    children: React.ReactNode;
};

export type ErrorBoundaryState = {
    _hasError: boolean;
};

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { _hasError: false };
    }

    static getDerivedStateFromError() {
        return { _hasError: true };
    }

    componentDidCatch(error: any, info: any) {
        console.error(error, info.componentStack);
    }

    render() {
        return this.state._hasError ? this.props.fallback : this.props.children;
    }
}